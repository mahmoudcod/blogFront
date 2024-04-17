
import { gql, useQuery } from '@apollo/client';

import '../style/hint.css'

const gridQuery = gql`
  query Hint {
    hint {
      data {
        id
     attributes {
        importantHInt
        }
      }
    }
  }
`;

function Hint() {
  const { loading, error, data } = useQuery(gridQuery);

  if (loading) return null;
  if (error) return <p>Error: {error.message}</p>;
  const hint = data.hint.data.attributes.importantHInt
  return (
    <div className='container'>

      <div className='hint'>
        <p>{hint}</p>
      </div>
    </div>
  );
}

export default Hint;
