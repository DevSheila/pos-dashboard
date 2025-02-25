import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--chart-2))",
  },
} ;

const BarChartComponent = ({ data, xKey, dataKey, name, desc,height = 300, vertical = false }) => {
  return (
    <Card className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">

      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[${height}px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={vertical ? "vertical" : "horizontal"}
              margin={vertical ? { top: 20, right: 30, left: 70, bottom: 5 } : {}}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey={vertical ? null : xKey} tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis dataKey={vertical ? xKey : null} tickLine={false} axisLine={false} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey={dataKey} fill="hsl(var(--chart-2))" radius={8} name={name} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing recent data trends</div>
      </CardFooter>
    </Card>
  );
};

export default BarChartComponent;