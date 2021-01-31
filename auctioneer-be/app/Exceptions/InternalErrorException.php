<?php

namespace App\Exceptions;

use Config;
use Symfony\Component\HttpKernel\Exception\HttpException;

class InternalErrorException extends HttpException
{
    public function __construct($message = 'Something went wrong', array $headers = [])
    {
        parent::__construct(500, $message, null, $headers, 500);
    }
}
