FROM python:3.14.2-slim

WORKDIR /backend

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . ./backend

EXPOSE 5173

CMD ["npm", "run", ""]
