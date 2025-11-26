"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { marketplaceApi } from "@/lib/apis/marketplaceApi"
import { toast } from "sonner"
import { EditProductDialogProps, PresetItem } from "@/types/marketplace"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { COMPATIBILITY_OPTIONS, FEATURES_OPTIONS, SPECIFICATIONS_OPTIONS } from "@/constants/productOptions"
import { useMarketplaceDetail } from "@/lib/hooks/useMarketplaceHooks"
import PresetUploadModal from "@/app/(user-dashboard)/create-product/components/preset-upload-modal"
import Image from "next/image"
import { Plus, Paperclip } from "lucide-react"
import { BASE_URL } from "@/constants"

export function EditProductDialog({ open, onOpenChange, productId, onSuccess }: EditProductDialogProps) {
    const { data: productData, isLoading: isLoadingProduct } = useMarketplaceDetail(productId)
    const [isLoading, setIsLoading] = useState(false)
    const [isPresetModalOpen, setIsPresetModalOpen] = useState(false)
    const [existingPresetItems, setExistingPresetItems] = useState<PresetItem[]>([])
    const [newPresetItems, setNewPresetItems] = useState<PresetItem[]>([])
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "Presets",
        tags: "",
        compatibility: [] as string[],
        features: [] as string[],
        specifications: {
            adjustments: [] as string[],
            bestFor: [] as string[],
            difficulty: ""
        }
    })
    const [displayPrice, setDisplayPrice] = useState("")
    const [displayOriginalPrice, setDisplayOriginalPrice] = useState("")
    const [priceError, setPriceError] = useState("")
    const [originalPriceError, setOriginalPriceError] = useState("")

    useEffect(() => {
        if (productData && open) {
            setFormData({
                title: productData.name || productData.title || "",
                description: productData.description || "",
                price: productData.price?.toString() || "",
                originalPrice: productData.originalPrice?.toString() || "",
                category: productData.category || "Presets",
                tags: productData.tags?.join(', ') || "",
                compatibility: productData.compatibility || [],
                features: productData.features || [],
                specifications: {
                    adjustments: productData.specifications?.adjustments || [],
                    bestFor: productData.specifications?.bestFor || [],
                    difficulty: productData.specifications?.difficulty || ""
                }
            })
            setDisplayPrice(productData.price ? Number(productData.price).toLocaleString('vi-VN') : "")
            setDisplayOriginalPrice(productData.originalPrice ? Number(productData.originalPrice).toLocaleString('vi-VN') : "")
            setPriceError("")
            setOriginalPriceError("")

            // Load existing preset items from imagePairs
            if (productData.imagePairs && productData.imagePairs.length > 0) {
                const presetItems: PresetItem[] = productData.imagePairs.map((pair: any, index: number) => ({
                    id: `existing-${index}`,
                    beforeImage: pair.before as any, // Store URL as string
                    afterImage: pair.after as any, // Store URL as string
                    presetFile: { url: pair.before } as any, // Placeholder
                    beforePreview: `${BASE_URL}${pair.before}`,
                    afterPreview: `${BASE_URL}${pair.after}`,
                    presetFileName: `Preset ${index + 1}`
                }))
                setExistingPresetItems(presetItems)
            } else {
                setExistingPresetItems([])
            }

            setNewPresetItems([])
        }
    }, [productData, open])

    const validatePrice = (currentPrice: string, currentOriginalPrice: string) => {
        if (currentPrice && currentOriginalPrice) {
            const priceNum = parseFloat(currentPrice)
            const originalPriceNum = parseFloat(currentOriginalPrice)

            if (priceNum > originalPriceNum) {
                setPriceError('Price cannot be higher than original price')
            } else {
                setPriceError('')
                setOriginalPriceError('')
            }
        } else {
            setPriceError('')
            setOriginalPriceError('')
        }
    }

    const handlePriceChange = (value: string) => {
        if (value && !/^[\d.]*$/.test(value)) {
            setPriceError('Please enter a valid number')
            return
        }

        const numericValue = value.replace(/\D/g, "")

        if (numericValue === '') {
            setFormData({ ...formData, price: '' })
            setDisplayPrice('')
            setPriceError('')
            return
        }

        const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

        setFormData({ ...formData, price: numericValue })
        setDisplayPrice(formattedValue)
        setPriceError('')
        validatePrice(numericValue, formData.originalPrice)
    }

    const handleOriginalPriceChange = (value: string) => {
        if (value && !/^[\d.]*$/.test(value)) {
            setOriginalPriceError('Please enter a valid number')
            return
        }

        const numericValue = value.replace(/\D/g, "")

        if (numericValue === '') {
            setFormData({ ...formData, originalPrice: '' })
            setDisplayOriginalPrice('')
            setOriginalPriceError('')
            return
        }

        const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

        setFormData({ ...formData, originalPrice: numericValue })
        setDisplayOriginalPrice(formattedValue)
        setOriginalPriceError('')
        validatePrice(formData.price, numericValue)
    }

    const handleCompatibilityChange = (option: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            compatibility: checked
                ? [...prev.compatibility, option]
                : prev.compatibility.filter(item => item !== option)
        }))
    }

    const handleFeatureChange = (option: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            features: checked
                ? [...prev.features, option]
                : prev.features.filter(item => item !== option)
        }))
    }

    const handleSpecificationChange = (type: 'adjustments' | 'bestFor', option: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            specifications: {
                ...prev.specifications,
                [type]: checked
                    ? [...prev.specifications[type], option]
                    : prev.specifications[type].filter(item => item !== option)
            }
        }))
    }

    const handleSaveNewPresetItems = (items: PresetItem[]) => {
        setNewPresetItems(items)
        toast.success(`${items.length} preset item(s) added successfully!`)
    }

    const getTotalPresetCount = () => {
        return existingPresetItems.length + newPresetItems.length
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (priceError || originalPriceError) {
            toast.error('Please fix validation errors before submitting')
            return
        }

        if (formData.originalPrice && formData.price) {
            const priceNum = parseFloat(formData.price)
            const originalPriceNum = parseFloat(formData.originalPrice)
            if (priceNum > originalPriceNum) {
                toast.error('Price cannot be higher than original price')
                return
            }
        }

        // Validate at least one preset item exists
        const totalPresets = getTotalPresetCount()
        if (totalPresets === 0) {
            toast.error('Product must have at least one preset item. Please add preset items before saving.')
            return
        }

        setIsLoading(true)

        try {
            const updateData = new FormData()

            updateData.append('title', formData.title)
            updateData.append('description', formData.description)
            updateData.append('price', formData.price)

            if (formData.originalPrice) {
                updateData.append('originalPrice', formData.originalPrice)

                if (formData.price) {
                    const priceNum = parseFloat(formData.price)
                    const originalPriceNum = parseFloat(formData.originalPrice)
                    if (originalPriceNum > priceNum) {
                        const discountPercent = Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100)
                        updateData.append('discount', discountPercent.toString())
                    }
                }
            }

            updateData.append('category', formData.category)

            if (formData.tags) {
                const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
                if (tagsArray.length > 0) {
                    updateData.append('tags', JSON.stringify(tagsArray))
                }
            }

            if (formData.compatibility.length > 0) {
                updateData.append('compatibility', JSON.stringify(formData.compatibility))
            }

            if (formData.features.length > 0) {
                updateData.append('features', JSON.stringify(formData.features))
            }

            if (formData.specifications.adjustments.length > 0 ||
                formData.specifications.bestFor.length > 0 ||
                formData.specifications.difficulty) {
                updateData.append('specifications', JSON.stringify(formData.specifications))
            }

            // Handle preset items - only send new items if they exist
            if (newPresetItems.length > 0) {
                const fileFormats = new Set<string>()
                let totalSize = 0

                newPresetItems.forEach(item => {
                    const file = item.presetFile as File
                    const extension = '.' + file.name.split('.').pop()
                    fileFormats.add(extension)
                    totalSize += file.size
                })

                const fileFormatStr = Array.from(fileFormats).join(', ')
                const fileSizeStr = totalSize > 1048576
                    ? `${(totalSize / 1048576).toFixed(2)} MB`
                    : `${(totalSize / 1024).toFixed(2)} KB`

                updateData.append('fileFormat', fileFormatStr)
                updateData.append('fileSize', fileSizeStr)
                updateData.append('includesCount', totalPresets.toString())

                // Use first new preset item's after image as cover if available
                updateData.append('image', newPresetItems[0].afterImage)

                // Add new preset items
                newPresetItems.forEach((item, index) => {
                    updateData.append(`imagePairs[${index}][before]`, item.beforeImage)
                    updateData.append(`imagePairs[${index}][after]`, item.afterImage)
                    updateData.append('presetFiles', item.presetFile as File)
                })
            } else {
                // If no new items, just update the count
                updateData.append('includesCount', totalPresets.toString())
            }

            await marketplaceApi.update(productId, updateData)

            toast.success("Product updated successfully")
            onOpenChange(false)
            onSuccess?.()
        } catch (error) {
            console.error("Error updating product:", error)
            const errorMessage = error instanceof Error ? error.message : "Failed to update product. Please try again."
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-6xl max-h-[90vh]">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                            Update your product details, pricing, and specifications.
                        </DialogDescription>
                    </DialogHeader>

                    {isLoadingProduct ? (
                        <div className="flex items-center justify-center py-12">
                            <p className="text-muted-foreground">Loading product data...</p>
                        </div>
                    ) : (
                        <ScrollArea className="h-[calc(90vh-180px)] pr-4">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-6">
                                    {/* Basic Information */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Basic Information</h3>
                                        <div className="grid gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="title">Title *</Label>
                                                <Input
                                                    id="title"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    placeholder="Product title"
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="description">Description *</Label>
                                                <Textarea
                                                    id="description"
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                    placeholder="Product description"
                                                    rows={4}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Pricing */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Pricing</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="originalPrice">Original Price (Optional)</Label>
                                                <Input
                                                    id="originalPrice"
                                                    type="text"
                                                    value={displayOriginalPrice}
                                                    onChange={(e) => handleOriginalPriceChange(e.target.value)}
                                                    placeholder="e.g. 499.000"
                                                />
                                                {originalPriceError && (
                                                    <p className="text-sm text-red-500">{originalPriceError}</p>
                                                )}
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="price">Price (₫) *</Label>
                                                <Input
                                                    id="price"
                                                    type="text"
                                                    value={displayPrice}
                                                    onChange={(e) => handlePriceChange(e.target.value)}
                                                    placeholder="e.g. 250.000"
                                                    required
                                                    className={priceError ? 'border-red-500' : ''}
                                                />
                                                {priceError && (
                                                    <p className="text-sm text-red-500">{priceError}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Additional Info */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Additional Information</h3>
                                        <div className="grid gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="category">Category</Label>
                                                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                                    <SelectTrigger id="category">
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Presets">Presets</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="tags">Tags (comma-separated)</Label>
                                                <Input
                                                    id="tags"
                                                    value={formData.tags}
                                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                                    placeholder="e.g. lightroom, preset, photography"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Compatibility */}
                                    <div className="space-y-4">
                                        <Label>Compatible Software</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {COMPATIBILITY_OPTIONS.map((option) => (
                                                <div key={option} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`compat-${option}`}
                                                        checked={formData.compatibility.includes(option)}
                                                        onCheckedChange={(checked) => handleCompatibilityChange(option, checked as boolean)}
                                                    />
                                                    <label
                                                        htmlFor={`compat-${option}`}
                                                        className="text-sm font-medium leading-none cursor-pointer"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Features */}
                                    <div className="space-y-4">
                                        <Label>Features</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {FEATURES_OPTIONS.map((option) => (
                                                <div key={option} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`feature-${option}`}
                                                        checked={formData.features.includes(option)}
                                                        onCheckedChange={(checked) => handleFeatureChange(option, checked as boolean)}
                                                    />
                                                    <label
                                                        htmlFor={`feature-${option}`}
                                                        className="text-sm font-medium leading-none cursor-pointer"
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Specifications */}
                                    <div className="space-y-4">
                                        <h3 className="font-semibold text-lg">Specifications</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <Label>Adjustments Included</Label>
                                                <div className="grid grid-cols-2 gap-3 mt-2">
                                                    {SPECIFICATIONS_OPTIONS.adjustments.map((option) => (
                                                        <div key={option} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`adj-${option}`}
                                                                checked={formData.specifications.adjustments.includes(option)}
                                                                onCheckedChange={(checked) => handleSpecificationChange('adjustments', option, checked as boolean)}
                                                            />
                                                            <label
                                                                htmlFor={`adj-${option}`}
                                                                className="text-sm font-medium leading-none cursor-pointer"
                                                            >
                                                                {option}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <Label>Best For</Label>
                                                <div className="grid grid-cols-2 gap-3 mt-2">
                                                    {SPECIFICATIONS_OPTIONS.bestFor.map((option) => (
                                                        <div key={option} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`best-${option}`}
                                                                checked={formData.specifications.bestFor.includes(option)}
                                                                onCheckedChange={(checked) => handleSpecificationChange('bestFor', option, checked as boolean)}
                                                            />
                                                            <label
                                                                htmlFor={`best-${option}`}
                                                                className="text-sm font-medium leading-none cursor-pointer"
                                                            >
                                                                {option}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <Label>Difficulty Level</Label>
                                                <Select
                                                    value={formData.specifications.difficulty}
                                                    onValueChange={(value) => setFormData(prev => ({
                                                        ...prev,
                                                        specifications: { ...prev.specifications, difficulty: value }
                                                    }))}
                                                >
                                                    <SelectTrigger className="mt-2">
                                                        <SelectValue placeholder="Select difficulty level" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {SPECIFICATIONS_OPTIONS.difficulty.map((level) => (
                                                            <SelectItem key={level} value={level}>{level}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Preset Items */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-lg">Preset Items</h3>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setIsPresetModalOpen(true)}
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add New Preset Items
                                            </Button>
                                        </div>

                                        {getTotalPresetCount() === 0 && (
                                            <div className="border border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4">
                                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                                    No preset items yet. Click "Add New Preset Items" to add before/after images and preset files.
                                                </p>
                                            </div>
                                        )}

                                        {/* New Preset Items */}
                                        {newPresetItems.length > 0 && (
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <Label className="text-sm text-muted-foreground">New Preset Items ({newPresetItems.length})</Label>
                                                    <span className="text-xs text-orange-600 dark:text-orange-400">
                                                        ⚠️ These will replace all current preset items when saved
                                                    </span>
                                                </div>
                                                <div className="grid gap-3">
                                                    {newPresetItems.map((item, index) => (
                                                        <div key={item.id} className="border rounded-lg p-4 space-y-3 bg-green-50 dark:bg-green-950/20">
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm font-medium">New Item {index + 1}</p>
                                                                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                                                                    New
                                                                </span>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground mb-1">Before</p>
                                                                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                                                                        <Image
                                                                            src={item.beforePreview}
                                                                            alt="Before"
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground mb-1">After</p>
                                                                    <div className="relative aspect-video rounded-lg overflow-hidden border">
                                                                        <Image
                                                                            src={item.afterPreview}
                                                                            alt="After"
                                                                            fill
                                                                            className="object-cover"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <p className="flex justify-start items-center gap-2 text-xs text-muted-foreground">
                                                                <Paperclip size={16} />{item.presetFileName}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Existing Preset Items */}
                                        {existingPresetItems.length > 0 && (
                                            <div className="space-y-3">
                                                <Label className="text-sm text-muted-foreground">
                                                    {newPresetItems.length > 0 ? 'Current Preset Items (will be replaced)' : 'Current Preset Items'}
                                                </Label>
                                                <div className="grid gap-3">
                                                    {existingPresetItems.map((item, index) => (
                                                        <div key={item.id} className={`border rounded-lg p-4 space-y-3 ${newPresetItems.length > 0 ? 'opacity-50' : ''}`}>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm font-medium">Item {index + 1}</p>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground mb-1">Before</p>
                                                                    <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
                                                                        <Image
                                                                            src={item.beforePreview}
                                                                            alt="Before"
                                                                            fill
                                                                            className="object-cover"
                                                                            unoptimized
                                                                            onError={(e) => {
                                                                                const target = e.target as HTMLImageElement;
                                                                                target.src = '/images/default-fallback-image.png';
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-muted-foreground mb-1">After</p>
                                                                    <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
                                                                        <Image
                                                                            src={item.afterPreview}
                                                                            alt="After"
                                                                            fill
                                                                            className="object-cover"
                                                                            unoptimized
                                                                            onError={(e) => {
                                                                                const target = e.target as HTMLImageElement;
                                                                                target.src = '/images/default-fallback-image.png';
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <Separator />

                                    {/* Footer Buttons */}
                                    <div className="flex justify-end gap-3 pt-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => onOpenChange(false)}
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isLoading}>
                                            {isLoading ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </ScrollArea>
                    )}
                </DialogContent>
            </Dialog>

            <PresetUploadModal
                isOpen={isPresetModalOpen}
                onClose={() => setIsPresetModalOpen(false)}
                onSave={handleSaveNewPresetItems}
                existingItems={newPresetItems}
            />
        </>
    )
}
