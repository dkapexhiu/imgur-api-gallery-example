// src/__ tests __/App.test.tsx
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor, getByTestId } from "@testing-library/react"
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from '../redux/index'
import App from "../App"
import { ImageCard } from '../components/Card';
import FullPost from '../components/Post';
import { Pagination } from '../components/Pagination';

test("Renders the main page", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(true).toBeTruthy();
});

test('renders App component correctly', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);

  expect(getByText('Future Gallery')).toBeInTheDocument();
  expect(getByText('HIDE VIRAL')).toBeInTheDocument();
});

test('renders App component without errors', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});

test('clicking Show Viral in FiltersBar component triggers action', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);

  const button = getByText('HIDE VIRAL');
  fireEvent.click(button);
});

test('clicking Hot in FiltersBar component triggers action', () => {
  const { getByText } = render(<Provider store={store}><App /></Provider>);

  const button = getByText('HOT');
  fireEvent.click(button);
});

test('Pagination component increments and decrements page correctly', async () => {
  const initialState = {
    gallery: {
      filters: {
        page: 1,
      },
    },
  };

  const { getByText } = render(<Provider store={store}><App /></Provider>);

  const incrementButton = getByText('Forward'); 
  const decrementButton = getByText('Back'); 

  // Dispatch the incrementPage action when increment button is clicked
  fireEvent.click(incrementButton);

  // Check if the state is updated correctly after incrementing the page
  await waitFor(() => {
    const state = store.getState();
    expect(state.gallery.filters.page).toBe(2); // Assuming the initial state of the page is 1
  });

  // Dispatch the decrementPage action when decrement button is clicked
  fireEvent.click(decrementButton);

  // Check if the state is updated correctly after decrementing the page
  await waitFor(() => {
    const state = store.getState();
    expect(state.gallery.filters.page).toBe(1); // Assuming the initial state of the page is 1
  });
});

test('ImageCard component renders correctly', () => {
  const photo = 'https://en.wikipedia.org/wiki/Santa_Claus#/media/File:Jonathan_G_Meath_portrays_Santa_Claus.jpg';
  const description = 'Sample Description';
  const score = 100;
  const upvotes = 50;
  const views = 200;

  const { getByText, getByAltText } = render(
    <ImageCard photo={photo} description={description} score={score} upvotes={upvotes} views={views} />
  );

  // Check if the description, score, upvotes, and views are rendered
  expect(getByText(description)).toBeInTheDocument();
  expect(getByText(upvotes.toString())).toBeInTheDocument();
  expect(getByText(score.toString())).toBeInTheDocument();
  expect(getByText(views.toString())).toBeInTheDocument();

  // Check if the photo is rendered with the correct alt text and source
  const photoElement = getByAltText('Card') as HTMLImageElement;
  expect(photoElement).toBeInTheDocument();
  expect(photoElement.src).toBe(photo);
});

const samplePost = {
  score: 100,
  ups: 50,
  downs: 10,
  comment_count: 30,
  views: 200,
  title: 'Sample Post Title',
  images: [{ link: 'https://en.wikipedia.org/wiki/Santa_Claus#/media/File:Jonathan_G_Meath_portrays_Santa_Claus.jpg' }, { link: 'https://en.wikipedia.org/wiki/Santa_Claus#/media/File:Jonathan_G_Meath_portrays_Santa_Claus.jpg' }],
};

test('FullPost component renders correctly with post data', () => {
  const { getByText, getByAltText } = render(<FullPost post={samplePost} />);

  // Check if the post data is rendered correctly
  expect(getByText('Sample Post Title')).toBeInTheDocument();
  expect(getByText('100')).toBeInTheDocument(); // Score
  expect(getByText('50')).toBeInTheDocument(); // Upvotes
  expect(getByText('10')).toBeInTheDocument(); // Downs
  expect(getByText('30')).toBeInTheDocument(); // Comment Count
  expect(getByText('200')).toBeInTheDocument(); // Views

  // Check if the images are rendered correctly
  const image1 = getByAltText('Post Image 1') as HTMLImageElement;
  const image2 = getByAltText('Post Image 2') as HTMLImageElement;
  expect(image1).toBeInTheDocument();
  expect(image2).toBeInTheDocument();
  expect(image1.src).toContain('https://en.wikipedia.org/wiki/Santa_Claus#/media/File:Jonathan_G_Meath_portrays_Santa_Claus.jpg');
  expect(image2.src).toContain('https://en.wikipedia.org/wiki/Santa_Claus#/media/File:Jonathan_G_Meath_portrays_Santa_Claus.jpg');
});

describe('Pagination component', () => {
  test('renders pagination buttons', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const backButton = getByText('Back');
    const forwardButton = getByText('Forward');

    expect(backButton).toBeInTheDocument();
    expect(forwardButton).toBeInTheDocument();
  });

  test('disables Back button on first page', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Pagination />
      </Provider>
    );

    const backButton = getByText('Back');
    expect(backButton).toBeDisabled();
  });
});