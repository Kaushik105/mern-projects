import { filterOptions } from "@/config";
import React, { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div>
        <h2 className="font-bold text-xl mb-2">Filters</h2>
        <Separator/>
      </div>
      <div className="flex flex-col gap-2.5">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div className="flex flex-col gap-2.5">
              <h3 className="font-medium text-lg">{keyItem}</h3>
              <div className="flex flex-col gap-2">
                {filterOptions[keyItem].map((option) => (
                  <Label key={option.id} className={"text-[15px]"}>
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
