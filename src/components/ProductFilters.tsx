import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'popular';

export interface FilterState {
  category: string;
  priceRange: [number, number];
  notes: string[];
  searchQuery: string;
  sortBy: SortOption;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableNotes: string[];
  maxPrice: number;
}

const ProductFilters = ({ filters, onFiltersChange, availableNotes, maxPrice }: ProductFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'Tous' },
    { value: 'homme', label: 'Homme' },
    { value: 'femme', label: 'Femme' },
    { value: 'unisex', label: 'Unisex' },
    { value: 'pack', label: 'Pack' }
  ];

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleNoteToggle = (note: string) => {
    const newNotes = filters.notes.includes(note)
      ? filters.notes.filter((n) => n !== note)
      : [...filters.notes, note];
    onFiltersChange({ ...filters, notes: newNotes });
  };

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchQuery: value });
  };

  const handleSortChange = (value: SortOption) => {
    onFiltersChange({ ...filters, sortBy: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: 'all',
      priceRange: [0, maxPrice],
      notes: [],
      searchQuery: '',
      sortBy: 'default'
    });
  };

  const hasActiveFilters = filters.category !== 'all' || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < maxPrice || 
    filters.notes.length > 0 ||
    filters.searchQuery.length > 0 ||
    filters.sortBy !== 'default';

  const sortOptions = [
    { value: 'default', label: 'Par défaut' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'name-asc', label: 'Nom A-Z' },
    { value: 'name-desc', label: 'Nom Z-A' },
    { value: 'popular', label: 'Popularité' }
  ];

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Search Bar */}
      <div>
        <h3 className="font-display text-sm font-semibold mb-3 text-foreground">Recherche</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un parfum..."
            value={filters.searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <h3 className="font-display text-sm font-semibold mb-3 text-foreground">Trier par</h3>
        <Select value={filters.sortBy} onValueChange={(value) => handleSortChange(value as SortOption)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Par défaut" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(({ value, label }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="font-display text-sm font-semibold mb-3 text-foreground">Catégorie</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(({ value, label }) => (
            <Button
              key={value}
              variant={filters.category === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(value)}
              className={cn(
                "transition-all duration-300",
                filters.category === value 
                  ? 'gradient-gold shadow-lg shadow-primary/20 text-noir' 
                  : 'hover:gradient-gold hover:border-transparent text-foreground hover:text-noir'
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-display text-sm font-semibold mb-3 text-foreground">
          Prix: {filters.priceRange[0]} - {filters.priceRange[1]} DH
        </h3>
        <Slider
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          max={maxPrice}
          min={0}
          step={10}
          className="w-full"
        />
      </div>

      {/* Notes Filter */}
      <div>
        <h3 className="font-display text-sm font-semibold mb-3 text-foreground">Notes olfactives</h3>
        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
          {availableNotes.map((note) => (
            <Badge
              key={note}
              variant={filters.notes.includes(note) ? 'default' : 'outline'}
              className={cn(
                "cursor-pointer transition-all duration-200",
                filters.notes.includes(note)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-primary/20'
              )}
              onClick={() => handleNoteToggle(note)}
            >
              {note}
              {filters.notes.includes(note) && <X className="h-3 w-3 ml-1" />}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button 
          variant="ghost" 
          onClick={clearFilters} 
          className="w-full text-muted-foreground hover:text-foreground"
        >
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <FiltersContent />
      </div>

      {/* Mobile Filter Button & Sheet */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full relative">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtres
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {filters.notes.length + (filters.category !== 'all' ? 1 : 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="font-display">Filtres</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ProductFilters;
