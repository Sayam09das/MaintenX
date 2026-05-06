# Model Card

## Model Overview

MaintenX AI currently uses an XGBoost classifier as the primary inference model for machine failure prediction. A Random Forest model is also available for comparison and evaluation.

## Intended Use

- Predictive maintenance experiments
- Operator support dashboards
- Educational demonstrations of failure classification workflows

Not intended for:

- Safety-critical autonomous shutdown decisions
- Production deployment without additional validation, monitoring, and domain review

## Inputs

Primary input fields:

- `Type`
- `Air temperature [K]`
- `Process temperature [K]`
- `Rotational speed [rpm]`
- `Torque [Nm]`
- `Tool wear [min]`
- `TWF`
- `HDF`
- `PWF`
- `OSF`
- `RNF`

Derived features:

- Temperature delta
- Power proxy
- Wear stress proxy

## Outputs

- Binary failure prediction
- Failure probability
- Risk percentage
- Risk level
- Maintenance explanation and recommendation

## Performance Snapshot

Current evaluation from `reports/metrics.json`:

- XGBoost
  Accuracy: `0.999`
  Precision: `1.0`
  Recall: `0.9705882352941176`
  F1 Score: `0.9850746268656716`
- Random Forest
  Accuracy: `0.9975`
  Precision: `1.0`
  Recall: `0.9264705882352942`
  F1 Score: `0.9618320610687023`

## Risks and Limitations

- Dataset class imbalance can make raw accuracy look stronger than minority-class behavior.
- Risk explanations are rule-based assistant summaries, not causal explanations.
- Model behavior is only validated on the included dataset split.
- Thresholds and failure policies should be reviewed before real operational use.
