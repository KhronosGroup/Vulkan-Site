# vkDeferredOperationJoinKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDeferredOperationJoinKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDeferredOperationJoinKHR - Assign a thread to a deferred operation

To assign a thread to a deferred operation, call:

// Provided by VK_KHR_deferred_host_operations
VkResult vkDeferredOperationJoinKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      operation);

* 
`device` is the device which owns `operation`.

* 
`operation` is the deferred operation that the calling thread should
work on.

The `vkDeferredOperationJoinKHR` command will execute a portion of the
deferred operation on the calling thread.

The return value will be one of the following:

* 
A return value of [VK_SUCCESS](VkResult.html) indicates that `operation` is
complete.
The application **should** use [vkGetDeferredOperationResultKHR](vkGetDeferredOperationResultKHR.html) to
retrieve the result of `operation`.

* 
A return value of [VK_THREAD_DONE_KHR](VkResult.html) indicates that the deferred
operation is not complete, but there is no work remaining to assign to
threads.
Future calls to [vkDeferredOperationJoinKHR](#) are not necessary and
will simply harm performance.
This situation **may** occur when other threads executing
[vkDeferredOperationJoinKHR](#) are about to complete `operation`,
and the implementation is unable to partition the workload any further.

* 
A return value of [VK_THREAD_IDLE_KHR](VkResult.html) indicates that the deferred
operation is not complete, and there is no work for the thread to do at
the time of the call.
This situation **may** occur if the operation encounters a temporary
reduction in parallelism.
By returning [VK_THREAD_IDLE_KHR](VkResult.html), the implementation is signaling
that it expects that more opportunities for parallelism will emerge as
execution progresses, and that future calls to
[vkDeferredOperationJoinKHR](#) **can** be beneficial.
In the meantime, the application **can** perform other work on the calling
thread.

Implementations **must** guarantee forward progress by enforcing the following
invariants:

If only one thread has invoked [vkDeferredOperationJoinKHR](#) on a
given operation, that thread **must** execute the operation to completion
and return [VK_SUCCESS](VkResult.html).

If multiple threads have concurrently invoked
[vkDeferredOperationJoinKHR](#) on the same operation, then at least
one of them **must** complete the operation and return [VK_SUCCESS](VkResult.html).

Valid Usage (Implicit)

* 
[](#VUID-vkDeferredOperationJoinKHR-device-parameter) VUID-vkDeferredOperationJoinKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDeferredOperationJoinKHR-operation-parameter) VUID-vkDeferredOperationJoinKHR-operation-parameter

 `operation` **must** be a valid [VkDeferredOperationKHR](VkDeferredOperationKHR.html) handle

* 
[](#VUID-vkDeferredOperationJoinKHR-operation-parent) VUID-vkDeferredOperationJoinKHR-operation-parent

 `operation` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

* 
[VK_THREAD_DONE_KHR](VkResult.html)

* 
[VK_THREAD_IDLE_KHR](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html), [VkDeferredOperationKHR](VkDeferredOperationKHR.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html#vkDeferredOperationJoinKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
