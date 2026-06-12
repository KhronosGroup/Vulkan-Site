# vkGetDeferredOperationResultKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeferredOperationResultKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeferredOperationResultKHR - Query the result of a deferred operation

The `vkGetDeferredOperationResultKHR` function is defined as:

// Provided by VK_KHR_deferred_host_operations
VkResult vkGetDeferredOperationResultKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      operation);

* 
`device` is the device which owns `operation`.

* 
`operation` is the operation whose deferred result is being queried.

If no command has been deferred on `operation`,
`vkGetDeferredOperationResultKHR` returns [VK_SUCCESS](VkResult.html).

If the deferred operation is pending, `vkGetDeferredOperationResultKHR`
returns [VK_NOT_READY](VkResult.html).

If the deferred operation is complete, it returns the appropriate return
value from the original command.
This value **must** be one of the [VkResult](VkResult.html) values which could have been
returned by the original command if the operation had not been deferred.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeferredOperationResultKHR-device-parameter) VUID-vkGetDeferredOperationResultKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeferredOperationResultKHR-operation-parameter) VUID-vkGetDeferredOperationResultKHR-operation-parameter

 `operation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkGetDeferredOperationResultKHR-operation-parent) VUID-vkGetDeferredOperationResultKHR-operation-parent

 `operation` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#vkGetDeferredOperationResultKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
