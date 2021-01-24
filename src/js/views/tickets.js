import currencyUI from './currency';
import locations from '../store/locations';

class TicketsUI {
  constructor(currency, locations) {
    this.container = document.querySelector('.tickets-sections .row');
    this.favoritesContainer = document.querySelector('#dropdown1');
    this.currencySymbol = currency.currencySymbol;
    this.clearFavoritesContainer();
    this.locations = locations;
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = '';

    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket, this.currencySymbol);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);

    let addButtons = document.querySelectorAll('.add-favorite');
    // // console.log(addButtons);
    if (addButtons.length > 0) {
      addButtons.forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          let a = e.target;
          // console.log(a);
          let ticketForm = a.closest('.ticket-card');
          this.addToFavorite(ticketForm);
        })
      });
    }
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `
      <div class="tickets-empty-res-msg">По вашему запросу билетов не найдено.</div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="col s12 m6">
      <div class="card ticket-card" id="${ticket.guid}">
        <div class="ticket-airline d-flex align-items-center">
          <img src="${ticket.airline_logo}" class="ticket-airline-img" />
          <span class="ticket-airline-name">${ticket.airline_name}</span>
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <a class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto">Add to favorites</a>
      </div>
    </div>
    `;
  }

  addToFavorite(ticketForm) {
    // console.log(ticketForm);
    let ticket = this.locations.addToFavorite(ticketForm.id);
    // console.log(ticket);
    this.renderOneFavoriteTicket(ticket);
  }
 
  // Favorites

  clearFavoritesContainer() {
    this.favoritesContainer.innerHTML = '';
  }

  deleteFromFavorite(favoriteTicketForm) {
    // console.log(favoriteTicketForm.id);
    let guid = favoriteTicketForm.id;
    this.locations.removeFromFavorite(guid.substr(5,guid.length - 4));
    favoriteTicketForm.remove();
  }

  renderOneFavoriteTicket(ticket) {
    let fragment = TicketsUI.ticketFavoriteTemplate(ticket, this.currencySymbol);
    this.favoritesContainer.insertAdjacentHTML('afterbegin', fragment);

    let deleteButton = this.favoritesContainer.querySelector(`#fav_${ticket.guid}`);
    // console.log(`#fav_${ticket.guid}`);
    // console.log(deleteButton);
    
    if (deleteButton !== null) {
      deleteButton.addEventListener('click', e => {
          e.preventDefault();
          let a = e.target;
          // console.log(a);
          let favTicketForm = a.closest('.favorite-item');
          this.deleteFromFavorite(favTicketForm);
          // a.removeEventListener('click', removeFavoriteHandler);
        });
    }
  }

  static ticketFavoriteTemplate(ticket, currency) {
    return `
    <div class="favorite-item  d-flex align-items-start" id="fav_${ticket.guid}">
      <img src="${ticket.airline_logo}" class="favorite-item-airline-img" />
      <div class="favorite-item-info d-flex flex-column">
        <div class="favorite-item-destination d-flex align-items-center" >
          <div class="d-flex align-items-center mr-auto">
            <span class="favorite-item-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}<</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
      </div>
    </div>
    `;
  }

}

const ticketsUI = new TicketsUI(currencyUI, locations);

export default ticketsUI;