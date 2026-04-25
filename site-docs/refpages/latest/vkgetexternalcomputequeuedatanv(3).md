# vkGetExternalComputeQueueDataNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetExternalComputeQueueDataNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetExternalComputeQueueDataNV - Retrieves data necessary for compatible external API initialization

To query the implementation-specific data that must be passed to compatible
external APIs during their initialization process call:

// Provided by VK_NV_external_compute_queue
void vkGetExternalComputeQueueDataNV(
    VkExternalComputeQueueNV                    externalQueue,
    VkExternalComputeQueueDataParamsNV*         params,
    void*                                       pData);

* 
`externalQueue` is the [VkExternalComputeQueueNV](VkExternalComputeQueueNV.html) to query the
data for.

* 
`params` is a pointer to a [VkExternalComputeQueueDataParamsNV](VkExternalComputeQueueDataParamsNV.html)
structure specifying parameters required for retrieval of the
implementation-specific data.

* 
`pData` is a pointer to application-allocated memory in which the
requested data will be returned.

Valid Usage

* 
[](#VUID-vkGetExternalComputeQueueDataNV-pData-08134) VUID-vkGetExternalComputeQueueDataNV-pData-08134

`pData` **must** be at least the size specified by the externalDataSize
field in the [VkPhysicalDeviceExternalComputeQueuePropertiesNV](VkPhysicalDeviceExternalComputeQueuePropertiesNV.html)
structure

Valid Usage (Implicit)

* 
[](#VUID-vkGetExternalComputeQueueDataNV-externalQueue-parameter) VUID-vkGetExternalComputeQueueDataNV-externalQueue-parameter

 `externalQueue` **must** be a valid [VkExternalComputeQueueNV](VkExternalComputeQueueNV.html) handle

* 
[](#VUID-vkGetExternalComputeQueueDataNV-params-parameter) VUID-vkGetExternalComputeQueueDataNV-params-parameter

 `params` **must** be a valid pointer to a [VkExternalComputeQueueDataParamsNV](VkExternalComputeQueueDataParamsNV.html) structure

* 
[](#VUID-vkGetExternalComputeQueueDataNV-pData-parameter) VUID-vkGetExternalComputeQueueDataNV-pData-parameter

 `pData` **must** be a pointer value

[VK_NV_external_compute_queue](VK_NV_external_compute_queue.html), [VkExternalComputeQueueDataParamsNV](VkExternalComputeQueueDataParamsNV.html), [VkExternalComputeQueueNV](VkExternalComputeQueueNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_NV_external_compute_queue/VK_NV_external_compute_queue.html#vkGetExternalComputeQueueDataNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
