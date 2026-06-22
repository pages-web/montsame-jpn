// "use client";

// import NewsCard from "./NewsCard";

// function SectionHeader({ title }: { title: string }) {
//   return (
//     <div className="flex items-center gap-4 py-4">
//       <div className="h-px bg-gray-300 flex-1" />
//       <h2 className="text-[#0C4DA2] font-bold text-[26px] font-ptserif whitespace-nowrap">
//         {title}
//       </h2>
//       <div className="h-px bg-gray-300 flex-1" />
//     </div>
//   );
// }

// const EDITORS_CHOICE = [
//   { category: "Монгол мэдээ", title: "Монгол орны дэлхийн нутгаар жавартай өнжинө", time: "10 цагийн өмнө" },
//   { category: "Эдийн засаг", title: "Зэсийн үнэ цойлсон шалтгаанууд, 2026 төлөв", time: "10 цагийн өмнө" },
//   { category: "Эрүүл мэнд", title: "1200 гаруй сурагчийн шүдийг эмчилжээ", time: "10 цагийн өмнө" },
//   { category: "Эдийн засаг", title: "Зэсийн үнэ цойлсон шалтгаанууд, 2026 төлөв", time: "10 цагийн өмнө" },
//   { category: "Монгол мэдээ", title: "Монгол орны дэлхийн нутгаар жавартай өнжинө", time: "10 цагийн өмнө" },
//   { category: "Эрүүл мэнд", title: "178743 гаруй сурагчийн шүдийг эмчилжээ", time: "10 цагийн өмнө" },
// ];

// type ColumnBlock = {
//   image: string;
//   imageCategory: string;
//   imageTitle: string;
//   imageTime: string;
//   list: Array<{ category: string; title: string; time: string }>;
// };

// const DEV_COLUMNS: ColumnBlock[] = [
//   {
//     image: "/images/a.png",
//     imageCategory: "Дорнод",
//     imageTitle: "Нисэх буудлын шинэчлэлийн ажил үргэлжилж байна",
//     imageTime: "10 цагийн өмнө",
//     list: [
//       { category: "Завхан", title: "Авто замын бүтээн байгуулалт...", time: "10 цагийн өмнө" },
//       { category: "Өвөрхангай", title: "Улаанбаатараас Бат-Өлзий сум...", time: "10 цагийн өмнө" },
//       { category: "Дорнод", title: "Улсын төсвөөс 124 тэрбум төгрөг...", time: "10 цагийн өмнө" },
//     ],
//   },
//   {
//     image: "/images/a.png",
//     imageCategory: "Завхан",
//     imageTitle: "Байгаль орчинд ээлтэй цэвэрлэгээ байгуулж байна",
//     imageTime: "10 цагийн өмнө",
//     list: [
//       { category: "Завхан", title: "Бусчилсэн хөгжлийн 7 төсөл", time: "10 цагийн өмнө" },
//       { category: "Өвөрхангай", title: "Арвайхээр сумын дулааны шугам...", time: "10 цагийн өмнө" },
//       { category: "Өвөрхангай", title: "Дулааны станцыг 2027 онд ашигл...", time: "10 цагийн өмнө" },
//     ],
//   },
//   {
//     image: "/images/a.png",
//     imageCategory: "Завхан",
//     imageTitle: "Авто замын бүтээн байгуулалт үргэлжилж байна",
//     imageTime: "10 цагийн өмнө",
//     list: [
//       { category: "Завхан", title: "Бусчилсэн хөгжлийн 7 төсөл", time: "10 цагийн өмнө" },
//       { category: "Өвөрхангай", title: "Арвайхээр сумын дулааны шугам...", time: "10 цагийн өмнө" },
//       { category: "Өвөрхангай", title: "Дулааны станцыг 2027 онд ашигл...", time: "10 цагийн өмнө" },
//     ],
//   },
// ];

// function ThreeColumnSection({ columns }: { columns: ColumnBlock[] }) {
//   return (
//     <div className="border border-gray-300">
//       <div className="grid grid-cols-1 md:grid-cols-3">
//         {columns.map((col, idx) => (
//           <div
//             key={idx}
//             className={`p-5 ${idx !== columns.length - 1 ? "md:border-r border-gray-300" : ""}`}
//           >
//             <NewsCard
//               variant="imageBlock"
//               image={col.image}
//               category={col.imageCategory}
//               title={col.imageTitle}
//               time={col.imageTime}
//             />

//             <div className="mt-4 divide-y divide-gray-200">
//               {col.list.map((it, j) => (
//                 <div key={j} className="py-3">
//                   <NewsCard
//                     variant="list"
//                     category={it.category}
//                     title={it.title}
//                     time={it.time}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function SidebarBlock({ title, image, text }: { title: string; image: string; text: string }) {
//   return (
//     <div className="border border-gray-300 mb-6">
//       <div className="border-b border-gray-300 px-4 py-3">
//         <div className="text-[#0C4DA2] font-bold text-[16px]">{title}</div>
//       </div>
//       <div className="p-4">
//         <NewsCard variant="sidebar" image={image} category={title} title={text} time="" />
//       </div>
//     </div>
//   );
// }

export default function NewsGrid() { return null; }
// export default function NewsGrid() {
//   return (
//     <div className="bg-white">
//       <div className="max-w-[1200px] mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//           <div className="lg:col-span-8">

//             <SectionHeader title="Редакцын сонголт" />

//             <div className="border border-gray-300">
//               <div className="grid grid-cols-1 md:grid-cols-3">
//                 {EDITORS_CHOICE.map((item, idx) => (
//                   <div
//                     key={idx}
//                     className={`p-4 
//                       ${idx < 3 ? "border-b border-gray-200" : ""} 
//                       ${idx % 3 !== 2 ? "md:border-r border-gray-200" : ""}`}
//                   >
//                     <NewsCard
//                       variant="list"
//                       category={item.category}
//                       title={item.title}
//                       time={item.time}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-12">
//               <SectionHeader title="Хөгжлийн төслүүд" />
//               <ThreeColumnSection columns={DEV_COLUMNS} />
//             </div>

//           </div>

//           <aside className="lg:col-span-4">
//             <SidebarBlock
//               title="Ярилцлага"
//               image="/images/a.png"
//               text="Д.Цэнд-Аюуш: Ерөнхийлөгчийн зарлиг гарсанаар уламжлалт анагаах ухааны орон нутгийн боломжийг нээнэ"
//             />
//             <SidebarBlock
//               title="Зочин нийтлэлч"
//               image="/images/a.png"
//               text="Д.Цэнд-Аюуш: Ерөнхийлөгчийн зарлиг гарсанаар уламжлалт анагаах ухааны орон нутгийн боломжийг нээнэ"
//             />
//           </aside>

//         </div>
//       </div>
//     </div>
//   );
// }