PYTHON := .venv/bin/python
UVICORN := .venv/bin/uvicorn

.PHONY: help install api train train-rf evaluate predict shap test docker-up docker-down

help:
	@echo "Available targets:"
	@echo "  install    - install Python dependencies into the local virtualenv"
	@echo "  api        - run the FastAPI development server"
	@echo "  train      - train the XGBoost model"
	@echo "  train-rf   - train the Random Forest model"
	@echo "  evaluate   - evaluate the XGBoost model"
	@echo "  predict    - run a sample prediction"
	@echo "  shap       - generate SHAP reports"
	@echo "  test       - run the unit test suite"
	@echo "  docker-up  - start the API with Docker Compose"
	@echo "  docker-down- stop the Docker Compose services"

install:
	$(PYTHON) -m pip install -r requirements.txt

api:
	$(UVICORN) src.predictive_maintenance.api.main:app --reload

train:
	$(PYTHON) scripts/train_model.py --model xgboost

train-rf:
	$(PYTHON) scripts/train_model.py --model random_forest

evaluate:
	$(PYTHON) scripts/evaluate_model.py --model xgboost

predict:
	$(PYTHON) scripts/run_prediction.py

shap:
	$(PYTHON) src/predictive_maintenance/explainability/shap_explainer.py

test:
	$(PYTHON) -m unittest discover -s tests -p 'test_*.py'

docker-up:
	docker compose up --build

docker-down:
	docker compose down
