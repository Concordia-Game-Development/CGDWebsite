import React from "react";
import { ArrowLeft } from "lucide-react";
import { ClientOnly } from "remix-utils/client-only";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import type { SizeGuide } from "~/lib/merch/models";

interface SizeGuideDrawerProps {
  sizeGuide: SizeGuide;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
}

export const SizeGuideDrawer: React.FC<SizeGuideDrawerProps> = ({
  sizeGuide,
  open,
  onOpenChange,
  onBack,
}) => {
  return (
    <ClientOnly fallback={null}>
      {() => (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent hideCloseButton={Boolean(onBack)}>
            <DialogHeader
              className={`shrink-0 px-6 pt-6 pb-3 border-b border-[#f2c5d3]/40 text-left gap-2 ${
                onBack ? "" : "pr-14"
              }`}
            >
              <DialogTitle className="font-ls uppercase text-3xl text-dark-purple">
                {sizeGuide.title}
              </DialogTitle>
              <DialogDescription className="font-corbert font-semibold text-sm sm:text-base text-dark-purple/80">
                {sizeGuide.subtitle}
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 min-h-0 overflow-y-auto px-6 py-4 flex flex-col gap-5">
              {sizeGuide.charts.map((chart) => (
                <div key={chart.id} className="flex flex-col gap-2">
                  <h3 className="font-ls uppercase text-xl text-dark-purple">
                    {chart.label}
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-[#f2c5d3]/70 bg-white/60">
                    <table className="w-full text-left border-collapse font-corbert text-sm">
                      <thead>
                        <tr className="bg-[#f2c5d3]/40 text-dark-purple font-bold">
                          {chart.columns.map((column) => (
                            <th key={column} className="px-4 py-2.5">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {chart.rows.map((row) => (
                          <tr
                            key={row.size}
                            className="border-t border-[#f2c5d3]/40 text-dark-purple/90"
                          >
                            <td className="px-4 py-2.5 font-extrabold">
                              {row.size}
                            </td>
                            {row.measurements.map((value, idx) => (
                              <td
                                key={`${row.size}-${idx}`}
                                className="px-4 py-2.5 font-semibold"
                              >
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl bg-[#f2c5d3]/35 px-4 py-3 text-xs sm:text-sm font-corbert font-semibold text-dark-purple/85">
                {sizeGuide.note}
              </div>
            </div>

            <DialogFooter className="shrink-0 px-6 py-4 border-t border-[#f2c5d3]/40 bg-white/60 sm:justify-stretch sm:space-x-0">
              {onBack ? (
                <Button
                  type="button"
                  onClick={onBack}
                  className="w-full rounded-full bg-dark-purple hover:bg-dark-purple/90 text-wfull font-corbert font-bold py-5 inline-flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="w-full rounded-full bg-dark-purple hover:bg-dark-purple/90 text-wfull font-corbert font-bold py-5"
                  >
                    Close
                  </Button>
                </DialogClose>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  );
};
