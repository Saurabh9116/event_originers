import React from 'react'
import { categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const { navigate } = useAppContext()

  return (
    <div className="mt-20">
      {/* Heading */}
      <p className="text-2xl md:text-3xl font-bold text-emerald-500 relative inline-block">
  🏥 Event Categories
  <span className="absolute -bottom-1 left-0 w-2/3 h-[3px] bg-emerald-500 rounded-full"></span>
</p>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-8 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group cursor-pointer py-6 px-4 rounded-xl flex flex-col justify-center items-center transition-all duration-300 transform hover:scale-105 hover:border-2 hover:border-red-400"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`)
              scrollTo(0, 0)
            }}
          >
            {/* Image */}
            {/* <div className="p-3 rounded-full bg-white/70 group-hover:bg-gradient-to-tr group-hover:from-red-400 group-hover:to-red-600 transition-all duration-300">
              <img
                // src={category.image}
                // alt={category.text}
                className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div> */}

            {/* Text */}
            <p className="mt-3 text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories