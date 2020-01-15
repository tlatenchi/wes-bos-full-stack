import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
	// This function will run first before the render function
	static async getInitialProps({ Component, ctx }) {
		let pageProps = {};

		// This condition code makes sure to crawl every single page
		// for any queries or mutations that need to be fetch. All
		// of th
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}
		// this exposes the query to the user
		pageProps.query = ctx.query;

		// Whatever we turn will be expose via props
		return { pageProps };
	}
	render() {
		const { Component, apollo, pageProps } = this.props;
		// console.log('hit');
		return (
			<Container>
				<ApolloProvider client={apollo}>
					<Page>
						<Component {...pageProps} />
					</Page>
				</ApolloProvider>
			</Container>
		);
	}
}

export default withData(MyApp);
