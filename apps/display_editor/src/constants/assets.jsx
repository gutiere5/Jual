export const ASSETS = {
  food: [
    {
      type: "food",
      name: "Street Tacos",
      price: "$8.99",
      image_src:
        "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=150&q=80",
      badges: [
        { id: "spicy", label: "H", color: "#ef4444", tooltip: "Hot" },
        { id: "vegan", label: "V", color: "#22c55e", tooltip: "Vegan" },
      ],
    },
    {
      type: "food",
      name: "Carne Asada Burrito",
      price: "$11.50",
      image_src:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=150&q=80",
    },
    {
      type: "food",
      name: "Churros & Chocolate",
      price: "$5.00",
      image_src:
        "https://images.unsplash.com/photo-1624300629298-e9ad39c5952f?w=150&q=80",
    },
    {
      type: "food",
      name: "Fresh Tamales",
      price: "$18.00",
      image_src:
        "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=150&q=80",
    },
  ],
  typography: [
    {
      type: "text",
      label: "Add a Heading",
      text: "Heading Text",
      fontSize: 48,
      fill: "#18181b",
      fontWeight: "bold",
    },
    {
      type: "text",
      label: "Add a Subheading",
      text: "Subheading",
      fontSize: 24,
      fill: "#3f3f46",
      fontWeight: "bold",
    },
    {
      type: "text",
      label: "Add Body Text",
      text: "Double-click to edit...",
      fontSize: 16,
      fill: "#71717a",
      fontWeight: "normal",
    },
  ],
  shapes: [
    {
      type: "rect",
      label: "Square / Panel",
      width: 100,
      height: 100,
      fill: "#e4e4e7",
    },
    { type: "circle", label: "Circle", radius: 50, fill: "#e4e4e7" },
    {
      type: "line",
      label: "Solid Line",
      points: [0, 0, 200, 0],
      stroke: "#18181b",
      strokeWidth: 4,
    },
    {
      type: "line",
      label: "Dashed Line",
      points: [0, 0, 200, 0],
      stroke: "#71717a",
      strokeWidth: 4,
      dash: [10, 10],
    },
    {
      type: "regularPolygon",
      label: "Triangle",
      sides: 3,
      radius: 50,
      fill: "#e4e4e7",
    },
  ],
};
