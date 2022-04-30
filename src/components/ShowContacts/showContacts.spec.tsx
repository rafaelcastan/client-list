import { fireEvent, render, screen } from '@testing-library/react';
import { SearchProvider } from '../../contexts/SearchContext';
import ShowContactsList from '../ShowContacts/index';

const ContactList = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  },
];

  
  describe ('Select component', ()=> {
    
    it('check if categories filter work', ()=>{


      render(
        <SearchProvider>
          <ShowContactsList  contactList={ContactList}/>
        </SearchProvider>
      )
        
      const radioButton = screen.getByText('synergize');

      fireEvent.click(radioButton);


      const results = screen.queryByText('Leanne Graham');


      expect(results).not.toBeInTheDocument();

      
    });

    it('check if search filter work', ()=>{


      render(
        <SearchProvider>
          <ShowContactsList  contactList={ContactList}/>
        </SearchProvider>
      )
        
      const searchInput = screen.getByPlaceholderText('Buscar contatos');

      fireEvent.change(searchInput, {target: {value: 'Leanne Graham'}})


      const results = screen.queryByText('Ervin Howell')


      expect(results).not.toBeInTheDocument();

      
    });

    it('check if range filter work', ()=>{


      render(
        <SearchProvider>
          <ShowContactsList  contactList={ContactList}/>
        </SearchProvider>
      )
        
      const firstLetter = screen.getByPlaceholderText('A');
      const lastLetter = screen.getByPlaceholderText('Z');

      fireEvent.change(firstLetter, {target: {value: 'L'}});
      fireEvent.change(lastLetter, {target: {value: 'L'}});


      const results = screen.queryByText('Ervin Howell');


      expect(results).not.toBeInTheDocument();

      fireEvent.change(firstLetter, {target: {value: 'E'}});
      fireEvent.change(lastLetter, {target: {value: 'L'}});

      const changedResults = screen.queryByText('Ervin Howell');

      expect(changedResults).toBeInTheDocument();

      
    });

    it('check if all filters are working together', ()=>{


      render(
        <SearchProvider>
          <ShowContactsList  contactList={ContactList}/>
        </SearchProvider>
      )
        
      const searchInput = screen.getByPlaceholderText('Buscar contatos');
      const firstLetter = screen.getByPlaceholderText('A');
      const lastLetter = screen.getByPlaceholderText('Z');
      const firstRadioButton = screen.getByText('harness');
      const secondRadioButton = screen.getByText('synergize');


      fireEvent.change(searchInput, {target: {value: 'Leanne'}});
      
      fireEvent.change(firstLetter, {target: {value: 'L'}});

      fireEvent.change(lastLetter, {target: {value: 'L'}});

      fireEvent.click(firstRadioButton);


      const firstResult = screen.queryByText('Leanne Graham');


      expect(firstResult).toBeInTheDocument();



      fireEvent.click(firstRadioButton);

      fireEvent.click(secondRadioButton);


      const secondResult = screen.queryByText('Leanne Graham');

      expect(secondResult).not.toBeInTheDocument();

      
      fireEvent.change(searchInput, {target: {value: ''}});

      fireEvent.change(firstLetter, {target: {value: 'E'}});

      fireEvent.change(lastLetter, {target: {value: 'E'}});
      
      fireEvent.click(secondRadioButton);


      const thirdResult = screen.queryByText('Leanne Graham');
      const fourthResult = screen.queryByText('Ervin Howell');
      
      expect(thirdResult).not.toBeInTheDocument();
      expect(fourthResult).toBeInTheDocument();
      
    });
    
  });