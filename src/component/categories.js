
import '../style/categories.css'
import { useQuery, gql } from '@apollo/client';

const CatQurey = gql`

  query Getcat {
    categories{
        data{
            id
            attributes{
                name
                icon{
                    data{
                        attributes{
                            url
                        }
                    }
                }
            }
        }
    }
}


`;
function Categories() {
  const { loading, error, data } = useQuery(CatQurey);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error....</p>;

  const categories = data.categories.data;

  return (
    <div className='categories'>
      {categories.map((category) => (
        <div key={category.id} className='category'>
             {category.attributes.icon && category.attributes.icon.data && (
                <img src={`http://localhost:1337${category.attributes.icon.data.attributes.url}`} alt='Gamer' />
                )}
          <h4>{category.attributes.name}</h4>
        </div>
      ))}
          {categories.map((category) => (
        <div key={category.id} className='category'>
    {category.attributes.icon && category.attributes.icon.data && (
                <img src={`http://localhost:1337${category.attributes.icon.data.attributes.url}`} alt='Gamer' />
                )}          <h4>{category.attributes.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default Categories;
