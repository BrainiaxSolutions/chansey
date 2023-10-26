# eventbridge rule to trigger lambda function each 5 minutes
resource "aws_cloudwatch_event_rule" "eventbridge_rule" {
  name                = var.eventbridge_rule_name
  description         = var.eventbridge_rule_description
  schedule_expression = var.eventbridge_rule_schedule_expression
}

resource "aws_cloudwatch_event_target" "eventbridge_target" {
  rule      = aws_cloudwatch_event_rule.eventbridge_rule.name
  target_id = var.eventbridge_target_id
  arn       = var.eventbridge_lambda_function_arn
}

resource "aws_lambda_permission" "eventbridge_permission" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = var.eventbridge_lambda_function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.eventbridge_rule.arn
}

resource "aws_cloudwatch_log_group" "eventbridge_log_group" {
  name              = "/aws/lambda/${var.eventbridge_lambda_function_name}-warmup"
  retention_in_days = 7
}
