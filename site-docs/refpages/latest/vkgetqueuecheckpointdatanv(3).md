# vkGetQueueCheckpointDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetQueueCheckpointDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetQueueCheckpointDataNV - Retrieve diagnostic checkpoint data

If the device encounters an error during execution, the implementation will
return a [VK_ERROR_DEVICE_LOST](VkResult.html) error to the application at a certain
point during host execution.
When this happens, the application **can** call
[vkGetQueueCheckpointDataNV](#) to retrieve information on the most recent
diagnostic checkpoints that were executed by the device.

// Provided by VK_NV_device_diagnostic_checkpoints
void vkGetQueueCheckpointDataNV(
    VkQueue                                     queue,
    uint32_t*                                   pCheckpointDataCount,
    VkCheckpointDataNV*                         pCheckpointData);

* 
`queue` is the [VkQueue](VkQueue.html) object the caller would like to
retrieve checkpoint data for

* 
`pCheckpointDataCount` is a pointer to an integer related to the
number of checkpoint markers available or queried, as described below.

* 
`pCheckpointData` is either `NULL` or a pointer to an array of
`VkCheckpointDataNV` structures.

If `pCheckpointData` is `NULL`, then the number of checkpoint markers
available is returned in `pCheckpointDataCount`.

Otherwise, `pCheckpointDataCount` **must** point to a variable set by the
application to the number of elements in the `pCheckpointData` array,
and on return the variable is overwritten with the number of structures
actually written to `pCheckpointData`.

If `pCheckpointDataCount` is less than the number of checkpoint markers
available, at most `pCheckpointDataCount` structures will be written.

Valid Usage

* 
[](#VUID-vkGetQueueCheckpointDataNV-queue-02025) VUID-vkGetQueueCheckpointDataNV-queue-02025

The device that `queue` belongs to **must** be in the lost state

Valid Usage (Implicit)

* 
[](#VUID-vkGetQueueCheckpointDataNV-queue-parameter) VUID-vkGetQueueCheckpointDataNV-queue-parameter

 `queue` **must** be a valid [VkQueue](VkQueue.html) handle

* 
[](#VUID-vkGetQueueCheckpointDataNV-pCheckpointDataCount-parameter) VUID-vkGetQueueCheckpointDataNV-pCheckpointDataCount-parameter

 `pCheckpointDataCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetQueueCheckpointDataNV-pCheckpointData-parameter) VUID-vkGetQueueCheckpointDataNV-pCheckpointData-parameter

 If the value referenced by `pCheckpointDataCount` is not `0`, and `pCheckpointData` is not `NULL`, `pCheckpointData` **must** be a valid pointer to an array of `pCheckpointDataCount` [VkCheckpointDataNV](VkCheckpointDataNV.html) structures

[VK_NV_device_diagnostic_checkpoints](VK_NV_device_diagnostic_checkpoints.html), [VkCheckpointDataNV](VkCheckpointDataNV.html), [VkQueue](VkQueue.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/debugging.html#vkGetQueueCheckpointDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
