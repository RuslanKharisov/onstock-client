import { useState, useEffect, useRef } from "react"
import { Input } from "@/shared/ui/input"
import { getRegionByName } from "@/entities/region/_api/get-region-by-name"

interface InputProps {
  field: any
  placeholder?: string
}

const RegionInput: React.FC<InputProps> = ({
  field,
  placeholder = "Определится автоматически",
}) => {
  const [inputValue, setInputValue] = useState<string>(field.value || "")
  const [suggestions, setSuggestions] = useState<any[]>([]) // Подсказки
  const [onFocus, setOnFocus] = useState<boolean>(false) // Устанавливаем изначально в false для блокировки отображения при рендере
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(field.value || "")
  }, [field.value])

  // Запрос к API при изменении
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRegionByName(inputValue)
        if (onFocus) {
          setSuggestions(response)
        }
      } catch {
        setSuggestions([])
      }
    }

    fetchData()
  }, [inputValue])

  // если поле в фокусе, снимаем блокировку отображения подсказки
  const handleFocus = () => {
    setOnFocus(true)
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Input
        {...field}
        disabled={true}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => {
          if (inputValue.length >= 2) {
            setSuggestions(suggestions) // Показываем уже загруженные данные
          }
          handleFocus()
        }}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full border border-gray-300 bg-white shadow-lg">
          {suggestions.map((option) => (
            <li
              key={option.id}
              className="cursor-pointer p-2 hover:bg-gray-200"
              onClick={() => {
                setOnFocus(false)
                setInputValue(option.name)
                setSuggestions([])
              }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RegionInput
