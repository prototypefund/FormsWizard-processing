"use client"

import { store } from 'state';
import { Provider } from 'react-redux';
import { YProvider, TestConsumer } from 'state';

import { Layout } from 'layout';
import { Table } from 'vis-table';
import { Form } from 'vis-form';
import { tabs } from '../app/Tabs';

export interface AppProps {
  title?: string;
}

export const App = ({
  title = 'FormsWizard Processing'
}: AppProps) => {


  return <Provider store={store}>
           <YProvider initialYState={{room: 'exampleRoom',
	                              webrtcConfig: {signaling: ['ws://localhost:4444']}}}>
	     <Layout title={ title }
	             drawer={ <Form/> }
		     tabs={ tabs }
             >
               <Table/>
	     </Layout>
	     <TestConsumer/>
	   </YProvider>
         </Provider>;
};
