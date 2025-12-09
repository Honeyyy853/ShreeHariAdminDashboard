// import React from 'react';
// import { X, Tag, Package, Calendar, Hash, Star, TrendingUp, Sparkles } from 'lucide-react';

// const ViewProduct = ({ product, onClose }) => {
//   if (!product) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Product Image */}
//             <div className="lg:col-span-1">
//               <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
//                 {product.image ? (
//                   <img 
//                     src={product.image} 
//                     alt={product.name}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <Package className="w-16 h-16 text-gray-400" />
//                 )}
//               </div>
              
//               {/* Badges */}
//               <div className="mt-4 flex flex-wrap gap-2">
//                 {product.featured && (
//                   <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                     <Star className="w-3 h-3" />
//                     Featured
//                   </span>
//                 )}
//                 {product.newArrival && (
//                   <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                     <Sparkles className="w-3 h-3" />
//                     New Arrival
//                   </span>
//                 )}
//                 {product.bestSeller && (
//                   <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                     <TrendingUp className="w-3 h-3" />
//                     Best Seller
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Product Details */}
//             <div className="lg:col-span-2">
//               <div className="space-y-6">
//                 {/* Basic Info */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
//                   <p className="text-gray-600">{product.description || 'No description provided'}</p>
//                 </div>

//                 {/* Pricing */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Price</label>
//                     <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
//                   </div>
//                   {product.discount && product.discount > 0 && (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-500 mb-1">Discount</label>
//                       <p className="text-2xl font-bold text-green-600">{product.discount}% OFF</p>
//                     </div>
//                   )}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Unit</label>
//                     <p className="text-gray-900 font-medium">{product.unit || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Stock</label>
//                     <p className="text-gray-900 font-medium">{product.stock || 0} units</p>
//                   </div>
//                 </div>

//                 {/* Category */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-500 mb-1">Category</label>
//                   <div className="flex items-center gap-2">
//                     <Tag className="w-4 h-4 text-gray-400" />
//                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                       {product.category || 'Uncategorized'}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Metadata */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Meta Title</label>
//                     <p className="text-gray-900">{product.metaTitle || 'N/A'}</p>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-500 mb-1">Meta Keywords</label>
//                     <p className="text-gray-900">{product.metaKeywords || 'N/A'}</p>
//                   </div>
//                 </div>

//                 {/* Dates */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <Calendar className="w-5 h-5 text-gray-400" />
//                       <span className="text-gray-600">Created</span>
//                     </div>
//                     <span className="font-semibold text-gray-900">
//                       {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <Calendar className="w-5 h-5 text-gray-400" />
//                       <span className="text-gray-600">Last Updated</span>
//                     </div>
//                     <span className="font-semibold text-gray-900">
//                       {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'N/A'}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewProduct;