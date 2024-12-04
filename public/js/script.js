document.addEventListener('DOMContentLoaded', async () => {
    const addHouseBtn = document.getElementById('addHouseBtn');
    const findHouseBtn = document.getElementById('findHouseBtn');
    const addHouseForm = document.getElementById('addHouseForm');
    const findHouseForm = document.getElementById('findHouseForm');
    const findStreetSelect = document.getElementById('findStreet');
    const findHouseNumberSelect = document.getElementById('findHouseNumber');
    const houseDetails = document.getElementById('houseDetails');
  
    addHouseBtn.addEventListener('click', () => {
      addHouseForm.style.display = 'block';
      findHouseForm.style.display = 'none';
    });
  
    findHouseBtn.addEventListener('click', () => {
      findHouseForm.style.display = 'block';
      addHouseForm.style.display = 'none';
      loadStreets();
    });
  
    document.getElementById('addForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());
      data.gasification = data.gasification === 'on';
      data.fireWaterSupply = data.fireWaterSupply === 'on';
  
      const response = await fetch('/api/houses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.text();
      alert(result);
    });
  
    document.getElementById('findForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const street = findStreetSelect.value;
      const houseNumber = findHouseNumberSelect.value;
  
      const response = await fetch(`/api/houses/find?street=${street}&houseNumber=${houseNumber}`);
      const house = await response.json();
  
      if (house) {
        houseDetails.style.display = 'block';
        document.getElementById('houseFloors').textContent = `Этажность: ${house.floors}`;
        document.getElementById('houseEntrances').textContent = `Подъезды: ${house.entrances}`;
        document.getElementById('houseMaterial').textContent = `Материал: ${house.material}`;
        document.getElementById('houseOverlapping').textContent = `Перекрытия: ${house.overlapping}`;
        document.getElementById('houseRoof').textContent = `Крыша: ${house.roof}`;
        document.getElementById('houseGasification').textContent = `Газификация: ${house.gasification ? 'Да' : 'Нет'}`;
        document.getElementById('houseFireWaterSupply').textContent = `Противопожарное водоснабжение: ${house.fireWaterSupply ? 'Да' : 'Нет'}`;
      } else {
        alert('Дом не найден');
      }
    });
  
    findStreetSelect.addEventListener('change', async () => {
      const street = findStreetSelect.value;
      loadHouses(street);
    });
  
    async function loadStreets() {
      const response = await fetch('/api/houses/streets');
      const streets = await response.json();
      findStreetSelect.innerHTML = '';
      streets.forEach(street => {
        const option = document.createElement('option');
        option.value = street;
        option.textContent = street;
        findStreetSelect.appendChild(option);
      });
    }
  
    async function loadHouses(street) {
      const response = await fetch(`/api/houses/houses?street=${street}`);
      const houses = await response.json();
      findHouseNumberSelect.innerHTML = '';
      houses.forEach(house => {
        const option = document.createElement('option');
        option.value = house.houseNumber;
        option.textContent = house.houseNumber;
        findHouseNumberSelect.appendChild(option);
      });
    }
  });
  