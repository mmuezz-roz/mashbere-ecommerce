import { redirect } from 'next/navigation';

/** /admin → redirect to dashboard */
export default function AdminRootPage() {
  redirect('/admin/dashboard');
}
