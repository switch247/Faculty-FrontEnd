import { motion } from "framer-motion";

const InputField = ({ label, name, type, error, toggle, setToggle, placeholder }) => {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <label className="block text-gray-700 text-sm font-medium mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-all
            ${error ? "border-red-500 focus:border-red-500" : "border-indigo-100 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"}
            placeholder-gray-400 text-lg`}
        />
        {name === "password" && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-700"
            onClick={() => setToggle(!toggle)}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              {toggle ? "👁" : "👁"}
            </motion.div>
          </button>
        )}
      </div>
      {error && (
        <motion.p
          className="text-red-500 text-sm mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default InputField;