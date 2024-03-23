// Code for most popular blogs
import { useQuery, gql } from "@apollo/client";


const mostPopularQuery = gql`
  query mostPopular {
    blogs{
      data {
        id
        attributes {
          title
          categories{
            data{
                attributes{
                    name
                }
            }
          }
        }
      }
    }
  }
`;


function MostPopular() {
    const { loading, error, data } = useQuery(mostPopularQuery);
    if (loading) return null
    if (error) return <p>Error....</p>;
    const blogs = data.blogs.data.slice(0, 10);
    return (
      <>
            <h3>الاكثر قراءة</h3>
            {blogs.map((recent) => (
            <div key={recent.id} className='mostPopular'>
                <small className="padd">{recent.attributes.categories.data[0].attributes.name}</small>
                <strong className="padd bor">{recent.attributes.title}</strong>

            </div>
            ))}
        </>
    );

}
export default MostPopular;