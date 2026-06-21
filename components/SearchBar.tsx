"use client";

import { useState, FormEvent } from "react";

// Definimos que quem usar a SearchBar precisa passar uma função que recebe o texto buscado
interface SearchBarProps {
  onSearch: (text: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
 
  const [inputText, setInputText] = useState("");

  // Função disparada quando o usuário envia o formulário (clica no botão ou aperta Enter)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Evita que a página recarregue 
    onSearch(inputText); // Envia o texto digitado para a página principal
  };

  return (
    
    <form onSubmit={handleSubmit} className="w-full max-w-2xl flex gap-2 mx-auto">
      <input 
        type="text" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)} 
        placeholder="Pesquise por um filme..." 
        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
      />
      
      <button 
        type="submit"
        className="px-6 py-3 bg-amber-500 text-zinc-950 font-bold rounded-lg hover:bg-amber-400 transition-colors text-sm sm:text-base"
      >
        Buscar
      </button>
    </form>
  );
}