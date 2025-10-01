import { useEffect, useState } from "react";

export default function Home (){
  const [articlesData, setArticlesData] = useState([])

useEffect(()=>{
  fetch("http://127.0.0.1:3000/")
    .then(response => response.json())
    .then(data => {
      setArticlesData(data)})
    .catch(error => {
      console.error("Erreur lors de la récupération des données :", error)
    })
},[])

  console.log("articlesData dans le render :", articlesData)
  
  return (
    <>
    <div>
      {articlesData && articlesData.length > 0 ? (
        <ul>
          {articlesData.map((article, idx) => (
            <div className="card-body" key={article.id || idx}>
              <h3>
                {article.title ? article.title : 'No Title'}
              </h3>
              <p>
                {article.content ? article.content : 'No Content'}
              </p>
            </div>
          ))}
        </ul>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
    
    </>
  )
}