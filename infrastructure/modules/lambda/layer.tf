resource "aws_lambda_layer_version" "lambda_layer" {
  layer_name       = var.lambda_function_layer_name
  s3_bucket = "lambdas-layers-pluvial"
  s3_key = "chansey/lambda-layer.zip"

  compatible_runtimes = [var.lambda_function_runtime]
}

data "archive_file" "deps_layer_code_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../../node_modules/"
  output_path = "${path.module}/../../../node_modules/deps.zip"
}
