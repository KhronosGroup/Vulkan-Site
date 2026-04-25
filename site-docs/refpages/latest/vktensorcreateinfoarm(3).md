# VkTensorCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorCreateInfoARM - Structure specifying the parameters of a newly created tensor object

The [VkTensorCreateInfoARM](#) structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorCreateInfoARM {
    VkStructureType                  sType;
    const void*                      pNext;
    VkTensorCreateFlagsARM           flags;
    const VkTensorDescriptionARM*    pDescription;
    VkSharingMode                    sharingMode;
    uint32_t                         queueFamilyIndexCount;
    const uint32_t*                  pQueueFamilyIndices;
} VkTensorCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkTensorCreateFlagBitsARM](VkTensorCreateFlagBitsARM.html) describing
additional parameters of the tensor.

* 
`pDescription` is a pointer to an instance of
[VkTensorDescriptionARM](VkTensorDescriptionARM.html) describing the tensor.

* 
`sharingMode` is a [VkSharingMode](VkSharingMode.html) value specifying the sharing
mode of the tensor when it will be accessed by multiple queue families.

* 
`queueFamilyIndexCount` is the number of entries in the
`pQueueFamilyIndices` array.

* 
`pQueueFamilyIndices` is a list of queue families that will access
this tensor (ignored if `sharingMode` is not
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html)).

To determine the set of valid `usage` bits for a given tensor format,
call [vkGetPhysicalDeviceFormatProperties2](vkGetPhysicalDeviceFormatProperties2.html) with
[VkTensorFormatPropertiesARM](VkTensorFormatPropertiesARM.html) in the `pNext` chain.

Tensor Creation Limits

Valid values for some tensor creation parameters are limited by a numerical
upper bound or by inclusion in a bitset.

Several limiting values are defined below.
The limiting values are referenced by the relevant valid usage statements of
`VkTensorCreateInfoARM`.

* 
Let the uint64_t tensorElements define the number of data elements
in the tensor computed as the product of all
`VkTensorCreateInfoARM`::`pDescription->pDimensions`[i] for i
between 0 and
`VkTensorCreateInfoARM`::`pDescription->dimensionCount` - 1.

Valid Usage

* 
[](#VUID-VkTensorCreateInfoARM-pDescription-09720) VUID-VkTensorCreateInfoARM-pDescription-09720

If `pDescription->tiling` is [VK_TENSOR_TILING_OPTIMAL_ARM](VkTensorTilingARM.html),
`pDescription->pStrides` **must** be `NULL`

* 
[](#VUID-VkTensorCreateInfoARM-tensorElements-09721) VUID-VkTensorCreateInfoARM-tensorElements-09721

`tensorElements` (as defined in
[resources-tensor-creation-limits](../../../../spec/latest/chapters/resources.html#resources-tensor-creation-limits)) **must** not be greater than
[VkPhysicalDeviceTensorPropertiesARM](VkPhysicalDeviceTensorPropertiesARM.html)::`maxTensorElements`

* 
[](#VUID-VkTensorCreateInfoARM-sharingMode-09722) VUID-VkTensorCreateInfoARM-sharingMode-09722

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html),
`pQueueFamilyIndices` **must** be a valid pointer to an array of
`queueFamilyIndexCount` `uint32_t` values

* 
[](#VUID-VkTensorCreateInfoARM-sharingMode-09723) VUID-VkTensorCreateInfoARM-sharingMode-09723

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html),
`queueFamilyIndexCount` **must** be greater than `1`

* 
[](#VUID-VkTensorCreateInfoARM-sharingMode-09725) VUID-VkTensorCreateInfoARM-sharingMode-09725

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), each element
of `pQueueFamilyIndices` **must** be unique and **must** be less than
`pQueueFamilyPropertyCount` returned by either
[vkGetPhysicalDeviceQueueFamilyProperties](vkGetPhysicalDeviceQueueFamilyProperties.html) or
[vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html) for the
`physicalDevice` that was used to create `device`

* 
[](#VUID-VkTensorCreateInfoARM-pNext-09864) VUID-VkTensorCreateInfoARM-pNext-09864

If the `pNext` chain includes a
[VkExternalMemoryTensorCreateInfoARM](VkExternalMemoryTensorCreateInfoARM.html) structure, its
`handleTypes` member **must** only contain bits that are also in
[VkExternalTensorPropertiesARM](VkExternalTensorPropertiesARM.html)::`externalMemoryProperties.compatibleHandleTypes`,
as returned by [vkGetPhysicalDeviceExternalTensorPropertiesARM](vkGetPhysicalDeviceExternalTensorPropertiesARM.html) with
`pExternalTensorInfo->handleType` equal to any one of the handle
types specified in
[VkExternalMemoryTensorCreateInfoARM](VkExternalMemoryTensorCreateInfoARM.html)::`handleTypes`

* 
[](#VUID-VkTensorCreateInfoARM-flags-09726) VUID-VkTensorCreateInfoARM-flags-09726

If `flags` includes
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html), the
[`descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay)
feature **must** be enabled

* 
[](#VUID-VkTensorCreateInfoARM-pNext-09727) VUID-VkTensorCreateInfoARM-pNext-09727

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) structure, `flags`
**must** contain
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html)

* 
[](#VUID-VkTensorCreateInfoARM-pDescription-09728) VUID-VkTensorCreateInfoARM-pDescription-09728

If `pDescription->usage` does not have any of the following bits set
(i.e. if it is not possible to create a tensor view for this tensor),
then the [format features](../../../../spec/latest/chapters/resources.html#resources-tensor-view-format-features) **must**
contain the format feature flags required by the `usage` flags for
`pDescription->format` as indicated in the
[Format Feature Dependent Usage Flags](../../../../spec/latest/chapters/formats.html#format-feature-dependent-usage-flags) section

[VK_TENSOR_USAGE_SHADER_BIT_ARM](VkTensorUsageFlagBitsARM.html)

* 
[VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](VkTensorUsageFlagBitsARM.html)

[](#VUID-VkTensorCreateInfoARM-protectedMemory-09729) VUID-VkTensorCreateInfoARM-protectedMemory-09729

If the [`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is not
enabled, `flags` **must** not contain
[VK_TENSOR_CREATE_PROTECTED_BIT_ARM](VkTensorCreateFlagBitsARM.html)

[](#VUID-VkTensorCreateInfoARM-flags-11395) VUID-VkTensorCreateInfoARM-flags-11395

If [VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html)::pData is not `NULL`,
`flags` **must** contain
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html)

[](#VUID-VkTensorCreateInfoARM-flags-11396) VUID-VkTensorCreateInfoARM-flags-11396

If `flags` contains
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html),
[VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html)::`pData->size` **must** be equal
to [    `imageCaptureReplayOpaqueDataSize`](../../../../spec/latest/chapters/limits.html#limits-imageCaptureReplayOpaqueDataSize)

Valid Usage (Implicit)

* 
[](#VUID-VkTensorCreateInfoARM-sType-sType) VUID-VkTensorCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkTensorCreateInfoARM-pNext-pNext) VUID-VkTensorCreateInfoARM-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExternalMemoryTensorCreateInfoARM](VkExternalMemoryTensorCreateInfoARM.html), [VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html), or [VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html)

* 
[](#VUID-VkTensorCreateInfoARM-sType-unique) VUID-VkTensorCreateInfoARM-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkTensorCreateInfoARM-flags-parameter) VUID-VkTensorCreateInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkTensorCreateFlagBitsARM](VkTensorCreateFlagBitsARM.html) values

* 
[](#VUID-VkTensorCreateInfoARM-pDescription-parameter) VUID-VkTensorCreateInfoARM-pDescription-parameter

 `pDescription` **must** be a valid pointer to a valid [VkTensorDescriptionARM](VkTensorDescriptionARM.html) structure

* 
[](#VUID-VkTensorCreateInfoARM-sharingMode-parameter) VUID-VkTensorCreateInfoARM-sharingMode-parameter

 `sharingMode` **must** be a valid [VkSharingMode](VkSharingMode.html) value

[VK_ARM_tensors](VK_ARM_tensors.html), [VkDeviceTensorMemoryRequirementsARM](VkDeviceTensorMemoryRequirementsARM.html), [VkSharingMode](VkSharingMode.html), [VkStructureType](VkStructureType.html), [VkTensorCreateFlagsARM](VkTensorCreateFlagsARM.html), [VkTensorDescriptionARM](VkTensorDescriptionARM.html), [vkCreateTensorARM](vkCreateTensorARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
