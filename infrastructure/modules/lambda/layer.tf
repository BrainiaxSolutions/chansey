resource "aws_lambda_layer_version" "lambda_layer" {
  layer_name       = var.lambda_function_layer_name
  filename         = "${path.module}/chansey-layer.zip"
  #   s3_bucket  = var.lambda_function_layer_s3_bucket
  #   s3_key     = var.lambda_function_layer_s3_key

  compatible_runtimes = [var.lambda_function_runtime]
}

data "aws_lambda_layer_version" "base_lambda_layer" {
  layer_name = var.lambda_function_base_layer_name
}
