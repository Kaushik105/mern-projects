import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/ProductTile";
import { Button } from "@/components/ui/button";
import { sortOptions } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredProducts,
  getProductDetails,
} from "@/store/shop/productsSlice";
import { useSearchParams } from "react-router-dom";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";

function createSearchParamHelper(filters) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filters)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function ShoppingListing() {
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const [sort, setSort] = useState(null);
  const [filters, setFilters] = useState({});
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openProductDialog, setOpenProductDialog] = useState(false);

  function handleSort(value) {
    setSort(value);
  }

  function handleFilter(sectionId, optionId) {
    let cpyFilters = { ...filters };
    const indexOfSectionId = Object.keys(cpyFilters).indexOf(sectionId);
    if (indexOfSectionId === -1) {
      cpyFilters[sectionId] = [optionId];
    } else {
      const indexOfOptionId = cpyFilters[sectionId].indexOf(optionId);
      if (indexOfOptionId === -1) {
        cpyFilters[sectionId].push(optionId);
      } else {
        cpyFilters[sectionId] = cpyFilters[sectionId].filter(
          (item) => item !== optionId
        );
      }
    }
    setFilters(cpyFilters);
  }

  function handleGetProductDetails(productId) {
    if (productDetails && productDetails._id == productId) {
      setOpenProductDialog(true);
    } else {
      dispatch(getProductDetails(productId)).then((data) => {
        if (data.payload.success) {
          setOpenProductDialog(true);
        }
      });
    }
  }

  useEffect(() => {
    if (productDetails !== null) {
      setOpenProductDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")));
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters]);

  useEffect(() => {
    sessionStorage.setItem("filters", JSON.stringify(filters));
    if (filters !== null && sort !== null) {
      dispatch(
        getFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2>All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {(productList && productList.length) || "0"} Products
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                  key={productItem._id}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        setOpen={setOpenProductDialog}
        open={openProductDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
