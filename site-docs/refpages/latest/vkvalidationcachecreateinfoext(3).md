# VkValidationCacheCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkValidationCacheCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkValidationCacheCreateInfoEXT - Structure specifying parameters of a newly created validation cache

The `VkValidationCacheCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_validation_cache
typedef struct VkValidationCacheCreateInfoEXT {
    VkStructureType                    sType;
    const void*                        pNext;
    VkValidationCacheCreateFlagsEXT    flags;
    size_t                             initialDataSize;
    const void*                        pInitialData;
} VkValidationCacheCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`initialDataSize` is the number of bytes in `pInitialData`.
If `initialDataSize` is zero, the validation cache will initially be
empty.

* 
`pInitialData` is a pointer to previously retrieved validation cache
data.
If the validation cache data is incompatible (as defined below) with the
device, the validation cache will be initially empty.
If `initialDataSize` is zero, `pInitialData` is ignored.

Valid Usage

* 
[](#VUID-VkValidationCacheCreateInfoEXT-initialDataSize-01534) VUID-VkValidationCacheCreateInfoEXT-initialDataSize-01534

If `initialDataSize` is not `0`, it **must** be equal to the size of
`pInitialData`, as returned by `vkGetValidationCacheDataEXT`
when `pInitialData` was originally retrieved

* 
[](#VUID-VkValidationCacheCreateInfoEXT-initialDataSize-01535) VUID-VkValidationCacheCreateInfoEXT-initialDataSize-01535

If `initialDataSize` is not `0`, `pInitialData` **must** have been
retrieved from a previous call to `vkGetValidationCacheDataEXT`

Valid Usage (Implicit)

* 
[](#VUID-VkValidationCacheCreateInfoEXT-sType-sType) VUID-VkValidationCacheCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_VALIDATION_CACHE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkValidationCacheCreateInfoEXT-pNext-pNext) VUID-VkValidationCacheCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkValidationCacheCreateInfoEXT-flags-zerobitmask) VUID-VkValidationCacheCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkValidationCacheCreateInfoEXT-pInitialData-parameter) VUID-VkValidationCacheCreateInfoEXT-pInitialData-parameter

 If `initialDataSize` is not `0`, `pInitialData` **must** be a valid pointer to an array of `initialDataSize` bytes

[VK_EXT_validation_cache](VK_EXT_validation_cache.html), [VkStructureType](VkStructureType.html), [VkValidationCacheCreateFlagsEXT](VkValidationCacheCreateFlagsEXT.html), [vkCreateValidationCacheEXT](vkCreateValidationCacheEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkValidationCacheCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
