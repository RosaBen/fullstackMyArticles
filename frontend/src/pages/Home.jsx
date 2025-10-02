
import { useArticles } from "../contexts/ArticlesContextDef";

export default function Home (){
  const { articles, loading, error } = useArticles();

  if (loading) {
    return <div>Chargement des articles...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }
  
  return (
    <>
    <div>
      {articles && articles.length > 0 ? (
        <ul>
          {articles.map((article, idx) => (
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