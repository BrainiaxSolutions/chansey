resource "aws_lambda_layer_version" "lambda_layer" {
  layer_name = var.lambda_function_layer_name
  s3_bucket  = var.lambda_function_layer_s3_bucket
  s3_key     = var.lambda_function_layer_s3_key

  compatible_runtimes = [var.lambda_function_runtime]
  depends_on = [ aws_s3_object.deps_layer_code_zip ]
}

data "aws_lambda_layer_version" "base_lambda_layer" {
  layer_name = var.lambda_function_base_layer_name
}
