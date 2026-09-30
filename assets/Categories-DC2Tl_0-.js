import{r as n,u as x,j as e,L as d}from"./index-CVbL5TLn.js";import{c as o,p as m}from"./products-DXfIlwRw.js";import{C as g}from"./LoadingSkeleton-BMMsql6Q.js";import{H as h}from"./house-D3J9AMPe.js";import{C as f}from"./chevron-right-CpAPCyQs.js";import{P as a}from"./package-ojUHJsl-.js";import{A as c}from"./arrow-right-DbKjaO7v.js";const u=({category:s})=>{const l=m.filter(i=>i.category===s.id).length;return e.jsxs("article",{className:`
        group bg-white rounded-2xl border border-slate-100 overflow-hidden
        shadow-sm hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1
        flex flex-col
      `,children:[e.jsxs("div",{className:"relative overflow-hidden",style:{aspectRatio:"4/3"},children:[e.jsx("img",{src:s.image,alt:s.name,loading:"lazy",className:`
            w-full h-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-105
          `}),e.jsx("div",{className:`
            absolute inset-0
            bg-gradient-to-t from-black/70 via-black/20 to-transparent
          `}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 p-5",children:e.jsx("h2",{className:"text-2xl font-bold text-white drop-shadow-md leading-tight",children:s.name})}),e.jsx("div",{className:`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`})]}),e.jsxs("div",{className:"flex flex-col flex-1 p-6 gap-4",children:[e.jsx("p",{className:"text-slate-500 text-sm leading-relaxed flex-1",children:s.description}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("span",{className:`
              inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
              bg-gradient-to-r ${s.color} text-white
            `,children:[e.jsx(a,{size:12}),s.count.toLocaleString()," Products"]}),l>0&&e.jsxs("span",{className:"text-xs text-slate-400",children:["(",l," in demo)"]})]}),e.jsxs(d,{to:`/shop?category=${s.id}`,className:`
            inline-flex items-center justify-center gap-2
            px-5 py-2.5 rounded-xl text-sm font-semibold
            bg-gradient-to-r ${s.color} text-white
            shadow-sm
            transition-all duration-200
            hover:shadow-md hover:gap-3
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
          `,"aria-label":`Explore ${s.name} category`,children:["Explore Category",e.jsx(c,{size:15})]})]})]})},C=()=>{const[s,l]=n.useState(!0),i=x();return n.useEffect(()=>{const t=setTimeout(()=>l(!1),600);return()=>clearTimeout(t)},[]),e.jsxs("div",{className:"page-enter min-h-screen bg-slate-50",children:[e.jsx("header",{className:"bg-white border-b border-slate-100 shadow-sm",children:e.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10",children:[e.jsxs("nav",{"aria-label":"Breadcrumb",className:"flex items-center gap-1.5 text-sm text-slate-400 mb-5",children:[e.jsxs(d,{to:"/",className:"flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors",children:[e.jsx(h,{size:14}),"Home"]}),e.jsx(f,{size:14,className:"text-slate-300"}),e.jsx("span",{className:"text-indigo-600 font-medium",children:"Categories"})]}),e.jsxs("div",{className:"max-w-2xl",children:[e.jsx("h1",{className:"text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight",children:"All Categories"}),e.jsx("p",{className:"mt-3 text-lg text-slate-500 leading-relaxed",children:"Explore our wide range of product categories and discover something you'll love."})]}),e.jsxs("div",{className:"mt-6 flex flex-wrap gap-6",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm text-slate-500",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100",children:e.jsx(a,{size:14,className:"text-indigo-600"})}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-slate-700 font-semibold",children:o.length})," categories"]})]}),e.jsxs("div",{className:"flex items-center gap-2 text-sm text-slate-500",children:[e.jsx("span",{className:"inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-100",children:e.jsx(a,{size:14,className:"text-violet-600"})}),e.jsxs("span",{children:[e.jsx("strong",{className:"text-slate-700 font-semibold",children:o.reduce((t,r)=>t+r.count,0).toLocaleString()})," ","total products"]})]})]})]})}),e.jsx("main",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12",children:s?e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6","aria-label":"Loading categories","aria-busy":"true",children:[...Array(6)].map((t,r)=>e.jsx(g,{},r))}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6","aria-label":"Product categories",children:o.map(t=>e.jsx(u,{category:t},t.id))}),e.jsx("div",{className:"mt-16 text-center",children:e.jsxs("div",{className:"inline-flex flex-col items-center gap-4 bg-white border border-slate-100 rounded-2xl shadow-sm px-10 py-8",children:[e.jsx("div",{className:"flex items-center justify-center w-14 h-14 rounded-full bg-indigo-50",children:e.jsx(a,{size:26,className:"text-indigo-600"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-bold text-slate-900",children:"Can't find what you're looking for?"}),e.jsx("p",{className:"mt-1 text-slate-500 text-sm",children:"Browse all products or use search to find exactly what you need."})]}),e.jsxs("button",{onClick:()=>i("/shop"),className:`
                    inline-flex items-center gap-2 px-6 py-3 rounded-xl
                    bg-gradient-to-r from-indigo-600 to-violet-600 text-white
                    font-semibold text-sm shadow-md
                    hover:shadow-lg hover:from-indigo-500 hover:to-violet-500
                    transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2
                  `,children:["Browse All Products",e.jsx(c,{size:16})]})]})})]})})]})};export{C as default};
