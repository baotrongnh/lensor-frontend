'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES } from '@/constants/path';
import { useMarketplace } from '@/lib/hooks/useMarketplaceHooks';
import { useEffect, useState } from 'react';
import FilterSidebar from './components/filter-sidebar';
import MarketplaceGrid from './components/marketplace-grid';
import MarketplaceHeader from './components/marketplace-header';

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [filters, setFilters] = useState({
        software: 'all',
        price: 'all',
        rating: 'all',
    });
    const [resetFilter, setResetFilter] = useState(false)

    const { data: marketplaceItems } = useMarketplace()
    console.log(marketplaceItems);

    const filteredItems = marketplaceItems?.data?.filter((item: any) => {
        const query = searchQuery.toLowerCase();

        const matchesSearch =
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query);

        const matchesSoftware =
            filters.software === 'all' || item.software === filters.software;

        const matchesRating =
            filters.rating === 'all' || (item.rating !== undefined && item.rating >= parseFloat(filters.rating));

        const priceValue = item.price
        let matchesPrice = true;
        if (filters.price === 'under-15') matchesPrice = priceValue < 15;
        else if (filters.price === '15-25') matchesPrice = priceValue >= 15 && priceValue <= 25;
        else if (filters.price === '25-50') matchesPrice = priceValue > 25 && priceValue <= 50;
        else if (filters.price === 'over-50') matchesPrice = priceValue > 50;
        return matchesSearch && matchesSoftware && matchesPrice && matchesRating;
    });

    const handleResetFilter = () => {
        if (resetFilter) {
            setSearchInput('')
            setSearchQuery('')
            setFilters({
                software: 'all',
                price: 'all',
                rating: 'all'
            })
        }
        setResetFilter(false)
    }

    useEffect(() => {
        const isDefault =
            searchInput === '' &&
            searchQuery === '' &&
            filters.software === 'all' &&
            filters.price === 'all' &&
            filters.rating === 'all';

        setResetFilter(!isDefault);
    }, [filters, searchInput, searchQuery])

    //delay o day ne
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearchQuery(searchInput);
        }, 500);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-10">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={ROUTES.HOME}>Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={ROUTES.MARKETPLACE}>Marketplace</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <MarketplaceHeader />

                <div className="grid grid-cols-1 md:grid-cols-14 gap-6">
                    <FilterSidebar
                        searchInput={searchInput}
                        onSearchChange={setSearchInput}
                        searchQuery={searchQuery}
                        resultsCount={filteredItems?.length}
                        filters={filters}
                        onFilterChange={setFilters}
                        resetFilter={resetFilter}
                        onResetFilter={handleResetFilter}
                    />

                    <div className="col-span-11">
                        <MarketplaceGrid
                            items={filteredItems}
                            searchQuery={searchQuery}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
