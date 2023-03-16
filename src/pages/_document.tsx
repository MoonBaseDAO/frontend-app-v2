import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';

const MyDocument = () => {
  return (
    <Html lang="en" className="h-full bg-white">
      <Head />
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);
  resetServerContext();
  return { ...initialProps };
};

export default MyDocument;