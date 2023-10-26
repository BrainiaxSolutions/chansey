variable "eventbridge_rule_name" {
  description = "AWS EventBridge rule name"
  type        = string
}

variable "eventbridge_rule_description" {
  description = "AWS EventBridge rule description"
  type        = string
}

variable "eventbridge_rule_schedule_expression" {
  description = "AWS EventBridge rule schedule expression"
  type        = string
  default     = "rate(5 minutes)"
}

variable "eventbridge_target_id" {
  description = "AWS EventBridge target id"
  type        = string
}

variable "eventbridge_lambda_function_name" {
  description = "AWS EventBridge lambda function name"
  type        = string
}

variable "eventbridge_lambda_function_arn" {
  description = "AWS EventBridge lambda function arn"
  type        = string
}
