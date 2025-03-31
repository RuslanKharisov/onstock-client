import { useState, useEffect, useRef } from "react"
import { Input } from "@/shared/ui/input"
import {
  ApiCityResponseDto,
  getCityByName,
} from "@/entities/city/_api/get-city-by-name"

interface InputProps {
  field: any
  placeholder?: string
}

const CityInput: React.FC<InputProps> = ({
  field,
  placeholder = "Начните ввод",
}) => {
  const [inputValue, setInputValue] = useState<{ id: number; name: string }>(
    field.value || {},
  )
  const [suggestions, setSuggestions] = useState<ApiCityResponseDto[]>([]) // Подсказки
  const [onFocus, setOnFocus] = useState<boolean>(false) // Устанавливаем изначально в false для блокировки отображения при рендере
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(field.value || "")
  }, [field.value])

  // Запрос к API при изменении
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCityByName(inputValue.name)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, name: e.target.value })
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Input
        {...field}
        className="block w-full "
        placeholder={placeholder}
        value={inputValue.name}
        onChange={(e) => handleChange(e)}
        onFocus={() => {
          if (inputValue.name.length >= 2) {
            setSuggestions(suggestions) // Показываем уже загруженные данные
          }
          handleFocus()
        }}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full border border-border bg-background shadow-lg">
          {suggestions.map((option) => (
            <li
              key={option.id}
              className="cursor-pointer p-2 hover:bg-foreground/10"
              onClick={() => {
                setOnFocus(false)
                setInputValue({
                  ...inputValue,
                  id: option.id,
                  name: option.name,
                })
                field.onChange({
                  ...inputValue,
                  id: option.id,
                  name: option.name,
                })
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

export default CityInput
