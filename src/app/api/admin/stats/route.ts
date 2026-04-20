import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { ApiResponse } from '@/lib/api-response';

/**
 * GET /api/admin/stats
 * Real-time dashboard statistics
 */
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    
    // 1. Fetch concurrent stats
    const [
      { count: totalProducts, error: pError },
      { data: lowStockData, error: lsError },
      { count: totalOrders, error: oError },
      { data: ordersData, error: odError },
      { count: totalUsers, error: uError }
    ] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('stock').lt('stock', 5),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('total, status'),
      supabase.from('profiles').select('*', { count: 'exact', head: true })
    ]);

    if (pError || lsError || oError || odError || uError) {
      console.warn('Some stats queries failed or tables are empty');
    }

    // 2. Aggregate Order Stats
    let revenue = 0;
    let pendingOrders = 0;
    let processingOrders = 0;
    let completedOrders = 0;

    (ordersData || []).forEach(order => {
      revenue += Number(order.total) || 0;
      if (order.status === 'pending') pendingOrders++;
      if (order.status === 'processing') processingOrders++;
      if (order.status === 'completed') completedOrders++;
    });

    const stats = {
      products: {
        total: totalProducts || 0,
        active: totalProducts || 0,
        lowStock: lowStockData?.length || 0,
        outOfStock: 0
      },
      orders: {
        total: totalOrders || 0,
        pending: pendingOrders,
        processing: processingOrders,
        completed: completedOrders,
        revenue: revenue
      },
      users: {
        total: totalUsers || 0,
        admins: 0,
        b2b: 0,
        customers: totalUsers || 0
      },
      quotes: {
        total: 0,
        new: 0,
        contacted: 0,
        closed: 0
      }
    };

    return ApiResponse.success(stats);
  } catch (error: any) {
    console.error('Admin Stats Error:', error);
    return ApiResponse.error(error.message || 'Failed to fetch dashboard stats', 500);
  }
}
