"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { orderApi } from '@/lib/apis/orderApi';
import { OrderStatus, SoldOrder } from '@/types/order';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { OrderDetailsDialog } from './components/order-details-dialog';
import { OrderStats } from './components/order-stats';
import { OrdersTable } from './components/orders-table';
import { WithdrawDialog } from './components/withdraw-dialog';
import { withdrawalApi } from '@/lib/apis/withdrawalApi';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

export default function SoldOrdersPage() {
     const [orders, setOrders] = useState<SoldOrder[]>([]);
     const [filteredOrders, setFilteredOrders] = useState<SoldOrder[]>([]);
     const [loading, setLoading] = useState(false);
     const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
     const [selectedOrder, setSelectedOrder] = useState<SoldOrder | null>(null);
     const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
     const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
     const [isWithdrawDialogOpen, setIsWithdrawDialogOpen] = useState(false);
     const [isWithdrawing, setIsWithdrawing] = useState(false);

     useEffect(() => {
          fetchOrders();
     }, []);

     useEffect(() => {
          filterOrders();
     }, [activeTab, orders]);

     useEffect(() => {
          if (activeTab !== 'ready_for_withdrawal') {
               setSelectedOrders([]);
          }
     }, [activeTab]);

     const fetchOrders = async () => {
          try {
               setLoading(true);
               const response = await orderApi.getSoldOrders();
               setOrders(response.data);
          } catch (error) {
               console.error('Error fetching orders:', error);
               toast.error('Failed to fetch orders');
          } finally {
               setLoading(false);
          }
     };

     const filterOrders = () => {
          if (activeTab === 'all') {
               setFilteredOrders(orders);
          } else {
               setFilteredOrders(orders.filter(order => order.status === activeTab));
          }
     };

     const handleViewDetails = (order: SoldOrder) => {
          setSelectedOrder(order);
          setIsDetailDialogOpen(true);
     };

     const handleWithdrawClick = (order: SoldOrder) => {
          setSelectedOrders([order.id]);
          setIsWithdrawDialogOpen(true);
     };

     const handleBulkWithdrawClick = () => {
          if (selectedOrders.length === 0) {
               toast.error('Please select orders to withdraw');
               return;
          }
          setIsWithdrawDialogOpen(true);
     };

     const handleOrderSelect = (orderId: string, checked: boolean) => {
          if (checked) {
               setSelectedOrders([...selectedOrders, orderId]);
          } else {
               setSelectedOrders(selectedOrders.filter(id => id !== orderId));
          }
     };

     const handleSelectAll = (checked: boolean) => {
          if (checked) {
               const withdrawableOrderIds = filteredOrders
                    .filter(order => order.canWithdraw === true)
                    .map(order => order.id);
               setSelectedOrders(withdrawableOrderIds);
          } else {
               setSelectedOrders([]);
          }
     };

     const handleWithdrawFromDetails = () => {
          if (selectedOrder) {
               setIsDetailDialogOpen(false);
               setSelectedOrders([selectedOrder.id]);
               setIsWithdrawDialogOpen(true);
          }
     };

     const handleWithdraw = async (bankCardId: string, orderIds: string[], note?: string) => {
          try {
               setIsWithdrawing(true);
               await withdrawalApi.createWithdrawal({
                    bankCardId,
                    orderIds,
                    note
               });
               toast.success('Withdrawal request submitted successfully!');
               setIsWithdrawDialogOpen(false);
               setSelectedOrders([]);
               fetchOrders();
          } catch (error: any) {
               console.error('Error creating withdrawal:', error);
               toast.error(error.response?.data?.message || 'Failed to create withdrawal request');
          } finally {
               setIsWithdrawing(false);
          }
     };

     return (
          <div className="container mx-auto py-6 space-y-6 p-8">
               {/* Header */}
               <div>
                    <h1 className="text-3xl font-bold">Sold Orders Management</h1>
                    <p className="text-muted-foreground mt-1">
                         Manage your sold orders and withdraw earnings
                    </p>
               </div>

               {/* Stats Cards */}
               <OrderStats orders={orders} />

               {/* Bulk Actions Bar */}
               {filteredOrders.some(o => o.canWithdraw === true) && (
                    <Card className="bg-muted/50">
                         <CardContent className="flex items-center justify-between p-4">
                              <div className="flex items-center gap-4">
                                   <Checkbox
                                        id="select-all"
                                        checked={
                                             selectedOrders.length > 0 &&
                                             selectedOrders.length === filteredOrders.filter(o => o.canWithdraw === true).length
                                        }
                                        onCheckedChange={handleSelectAll}
                                   />
                                   <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                                        Select All ({filteredOrders.filter(o => o.canWithdraw === true).length})
                                   </label>
                                   {selectedOrders.length > 0 && (
                                        <span className="text-sm text-muted-foreground">
                                             {selectedOrders.length} selected
                                        </span>
                                   )}
                              </div>
                              {selectedOrders.length > 0 && (
                                   <Button onClick={handleBulkWithdrawClick}>
                                        <Wallet className="mr-2 h-4 w-4" />
                                        Withdraw Selected ({selectedOrders.length})
                                   </Button>
                              )}
                         </CardContent>
                    </Card>
               )}

               {/* Orders Table */}
               <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                    <TabsList>
                         <TabsTrigger value="all">All Orders</TabsTrigger>
                         <TabsTrigger value="ready_for_withdrawal">Ready to Withdraw</TabsTrigger>
                         <TabsTrigger value="pending">Pending</TabsTrigger>
                         <TabsTrigger value="completed">Completed</TabsTrigger>
                         <TabsTrigger value="reported">Reported</TabsTrigger>
                         <TabsTrigger value="refunded">Refunded</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-4">
                         <Card>
                              <CardHeader>
                                   <CardTitle>Orders</CardTitle>
                                   <CardDescription>
                                        {loading ? 'Loading...' : `${filteredOrders.length} order(s)`}
                                   </CardDescription>
                              </CardHeader>
                              <CardContent>
                                   {loading ? (
                                        <div className="flex justify-center items-center py-12">
                                             <Spinner className="h-8 w-8" />
                                        </div>
                                   ) : filteredOrders.length === 0 ? (
                                        <div className="text-center py-12 text-muted-foreground">
                                             No orders found
                                        </div>
                                   ) : (
                                        <OrdersTable
                                             orders={filteredOrders}
                                             onViewDetails={handleViewDetails}
                                             onWithdraw={handleWithdrawClick}
                                             selectedOrders={selectedOrders}
                                             onOrderSelect={handleOrderSelect}
                                             showCheckboxes={filteredOrders.some(o => o.canWithdraw === true)}
                                        />
                                   )}
                              </CardContent>
                         </Card>
                    </TabsContent>
               </Tabs>

               {/* Dialogs */}
               <OrderDetailsDialog
                    order={selectedOrder}
                    open={isDetailDialogOpen}
                    onOpenChange={setIsDetailDialogOpen}
                    onWithdraw={handleWithdrawFromDetails}
               />

               <WithdrawDialog
                    orders={orders.filter(o => selectedOrders.includes(o.id))}
                    open={isWithdrawDialogOpen}
                    onOpenChange={setIsWithdrawDialogOpen}
                    onConfirm={handleWithdraw}
                    isSubmitting={isWithdrawing}
               />
          </div>
     );
}
