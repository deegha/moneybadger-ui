import { Header } from './header';
import { CategoryGrid } from './categoryGrid';
import { InnerContainer } from '@/components';

export default function DashboardPage() {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <InnerContainer>
        <CategoryGrid />
      </InnerContainer>
    </div>
  );
}
