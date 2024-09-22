import { useCallback, useEffect, useRef, useState } from 'react';

import useAuthenticate from '../../../hooks/authenticate';
import './addCategoryForm.css';
import { TiDeleteOutline } from 'react-icons/ti';

export default function AddCategoryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const [error, setError] = useState('');

  const { getJwt } = useAuthenticate();

  const handleDeleteCategory = useCallback(
    async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
      e.preventDefault();
      try {
        const response = await fetch(`/api/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getJwt()}`,
          },
        });

        const data = await response.json();
        if (data.message === 'Category deleted successfully') {
          const filteredCat = categories.filter((f) => f.id !== id);
          setCategories(() => [...filteredCat]);
        }
      } catch (err) {
        const ERROR = err as Error;
        setError(ERROR.message);
        console.error(ERROR.message);
      }
    },
    [getJwt, categories],
  );

  const handleSubmitCategory = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      if (nameRef.current?.value === '') {
        setError('Please fill in the name field');
        nameRef.current.focus();
        return;
      }

      try {
        const response = await fetch('/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getJwt()}`,
          },
          body: JSON.stringify({ name: nameRef.current?.value || '' }),
        });

        const data: Partial<{ id: number; name: string; message: string }> = await response.json();
        if (data.message === undefined) {
          setCategories((curr) => [...curr, { id: data.id!, name: data.name! }]);
          return;
        }

        throw new Error('Category already exists');
      } catch (err) {
        const ERROR = err as Error;
        setError(ERROR.message);
        nameRef.current?.focus();
        console.error(ERROR.message);
      } finally {
        formRef.current?.reset();
      }
    },
    [getJwt],
  );

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/categories', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getJwt()}`,
        },
      });

      const data: Array<{ id: number; name: string }> = await response.json();
      setCategories(data);
    }

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="add-category-form">
      {error !== '' && (
        <div className="add-category-error">
          <h3>{error}</h3>
        </div>
      )}
      <form ref={formRef}>
        <div className="form-control">
          <label htmlFor="cat-name">Category Name</label>
          <input required ref={nameRef} type="text" name="cat-name" id="cat-name" />
        </div>
        <div className="form-action">
          <button
            type='submit'
            onClick={(e) => {
              handleSubmitCategory(e);
            }}
          >
            Submit
          </button>
        </div>
      </form>
      <div className="add-category-table">
        <table>
          <thead>
            <tr>
              <th>
                <p>Existing Categories</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.name}</td>
                  <td>
                    <div onClick={(e) => handleDeleteCategory(e, cat.id)} className="action">
                      <TiDeleteOutline className="action-button" />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
