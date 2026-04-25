# Additional Capabilities

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/capabilities.html

## Table of Contents

- [Additional Image Capabilities](#capabilities-image)
- [Additional_Image_Capabilities](#capabilities-image)
- [Supported Sample Counts](#features-supported-sample-counts)
- [Supported_Sample_Counts](#features-supported-sample-counts)
- [Allowed Extent Values Based on Image Type](#features-extentperimagetype)
- [Allowed_Extent_Values_Based_on_Image_Type](#features-extentperimagetype)
- [Additional Buffer Capabilities](#capabilities-buffer)
- [Additional_Buffer_Capabilities](#capabilities-buffer)
- [Additional Tensor Capabilities](#capabilities-tensor)
- [Additional_Tensor_Capabilities](#capabilities-tensor)
- [Optional Semaphore Capabilities](#capabilities-semaphore)
- [Optional_Semaphore_Capabilities](#capabilities-semaphore)
- [Optional Fence Capabilities](#capabilities-fence)
- [Optional_Fence_Capabilities](#capabilities-fence)
- [Timestamp Calibration Capabilities](#features-timestamp-calibration)
- [Timestamp_Calibration_Capabilities](#features-timestamp-calibration)

## Content

This chapter describes additional capabilities beyond the minimum
capabilities described in the [Limits](limits.html#limits) and [Formats](formats.html#formats)
chapters, including:

* 
[Additional Image Capabilities](#capabilities-image)

* 
[Additional Buffer Capabilities](#capabilities-buffer)

* 
[Optional Semaphore Capabilities](#capabilities-semaphore)

* 
[Optional Fence Capabilities](#capabilities-fence)

* 
[Timestamp Calibration Capabilities](#features-timestamp-calibration)

Additional image capabilities, such as larger dimensions or additional
sample counts for certain image types, or additional capabilities for
*linear* tiling format images, are described in this section.

To query additional capabilities specific to image types, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceImageFormatProperties2](#vkGetPhysicalDeviceImageFormatProperties2). See [Legacy Functionality](../appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
VkResult vkGetPhysicalDeviceImageFormatProperties(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkImageType                                 type,
    VkImageTiling                               tiling,
    VkImageUsageFlags                           usage,
    VkImageCreateFlags                          flags,
    VkImageFormatProperties*                    pImageFormatProperties);

* 
`physicalDevice` is the physical device from which to query the
image capabilities.

* 
`format` is a [VkFormat](formats.html#VkFormat) value specifying the image format,
corresponding to [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`format`.

* 
`type` is a [VkImageType](resources.html#VkImageType) value specifying the image type,
corresponding to [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`imageType`.

* 
`tiling` is a [VkImageTiling](resources.html#VkImageTiling) value specifying the image tiling,
corresponding to [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`tiling`.

* 
`usage` is a bitmask of [VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits) specifying the
intended usage of the image, corresponding to
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`usage`.

* 
`flags` is a bitmask of [VkImageCreateFlagBits](resources.html#VkImageCreateFlagBits) specifying
additional parameters of the image, corresponding to
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`.

* 
`pImageFormatProperties` is a pointer to a
[VkImageFormatProperties](#VkImageFormatProperties) structure in which capabilities are
returned.

The `format`, `type`, `tiling`, `usage`, and `flags`
parameters correspond to parameters that would be consumed by
[vkCreateImage](resources.html#vkCreateImage) (as members of [VkImageCreateInfo](resources.html#VkImageCreateInfo)).

If `format` is not a supported image format, or if the combination of
`format`, `type`, `tiling`, `usage`, and `flags` is not
supported for images, then `vkGetPhysicalDeviceImageFormatProperties`
returns [VK_ERROR_FORMAT_NOT_SUPPORTED](fundamentals.html#VkResult).

The limitations on an image format that are reported by
`vkGetPhysicalDeviceImageFormatProperties` have the following property:
if `usage1` and `usage2` of type [VkImageUsageFlags](resources.html#VkImageUsageFlags) are such that
the bits set in `usage1` are a subset of the bits set in `usage2`, and
`flags1` and `flags2` of type [VkImageCreateFlags](resources.html#VkImageCreateFlags) are such that
the bits set in `flags1` are a subset of the bits set in `flags2`,
then the limitations for `usage1` and `flags1` **must** be no more strict
than the limitations for `usage2` and `flags2`, for all values of
`format`, `type`, and `tiling`.

If the [`hostImageCopy`](features.html#features-hostImageCopy) feature is supported,
and:

* 
`usage` includes [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), and

* 
`flags` does not include any of
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](resources.html#VkImageCreateFlagBits)

Then the result of calls to `vkGetPhysicalDeviceImageFormatProperties`
with identical parameters except for the inclusion of
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits) in `usage` **must** be identical.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-tiling-02248) VUID-vkGetPhysicalDeviceImageFormatProperties-tiling-02248

`tiling` **must** not be [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](resources.html#VkImageTiling).
(Use [vkGetPhysicalDeviceImageFormatProperties2](#vkGetPhysicalDeviceImageFormatProperties2) instead)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-format-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-type-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-type-parameter

 `type` **must** be a valid [VkImageType](resources.html#VkImageType) value

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-tiling-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](resources.html#VkImageTiling) value

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-usage-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits) values

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-usage-requiredbitmask) VUID-vkGetPhysicalDeviceImageFormatProperties-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-flags-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits](resources.html#VkImageCreateFlagBits) values

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties-pImageFormatProperties-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties-pImageFormatProperties-parameter

 `pImageFormatProperties` **must** be a valid pointer to a [VkImageFormatProperties](#VkImageFormatProperties) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkImageFormatProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageFormatProperties {
    VkExtent3D            maxExtent;
    uint32_t              maxMipLevels;
    uint32_t              maxArrayLayers;
    VkSampleCountFlags    sampleCounts;
    VkDeviceSize          maxResourceSize;
} VkImageFormatProperties;

* 
`maxExtent` are the maximum image dimensions.
See the [Allowed Extent Values](#features-extentperimagetype) section
below for how these values are constrained by `type`.

* 
`maxMipLevels` is the maximum number of mipmap levels.
`maxMipLevels` **must** be equal to the number of levels in the
complete mipmap chain based on the `maxExtent.width`,
`maxExtent.height`, and `maxExtent.depth`, except
when one of the following conditions is true, in which case it **may**
instead be `1`:

`vkGetPhysicalDeviceImageFormatProperties`::`tiling` was
[VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling)

* 
[VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2)::`tiling` was
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](resources.html#VkImageTiling)

* 
the [VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2)::`pNext` chain included
a [VkPhysicalDeviceExternalImageFormatInfo](#VkPhysicalDeviceExternalImageFormatInfo) structure with a handle
type included in the `handleTypes` member for which mipmap image
support is not required

* 
image `format` is one of the
[formats that require a     sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion)

* 
`flags` contains [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits)

`maxArrayLayers` is the maximum number of array layers.
`maxArrayLayers` **must** be no less than
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageArrayLayers`, except when one
of the following conditions is true, in which case it **may** instead be
`1`:

* 
`tiling` is [VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling)

* 
`tiling` is [VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling) and `type` is
[VK_IMAGE_TYPE_3D](resources.html#VkImageType)

* 
`format` is one of the
[formats that require a     sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion)

If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](resources.html#VkImageTiling), then
`maxArrayLayers` **must** not be 0.

`sampleCounts` is a bitmask of [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits)
specifying all the supported sample counts for this image as described
[below](#features-supported-sample-counts).

`maxResourceSize` is an upper bound on the total image size in
bytes, inclusive of all image subresources.
Implementations **may** have an address space limit on total size of a
resource, which is advertised by this property.
`maxResourceSize` **must** be at least 231.

|  | There is no mechanism to query the size of an image before creating it, to
| --- | --- |
compare that size against `maxResourceSize`.
If an application attempts to create an image that exceeds this limit, the
creation will fail and [vkCreateImage](resources.html#vkCreateImage) will return
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult).
While the advertised limit **must** be at least 231, it **may** not be possible
to create an image that approaches that size, particularly for
[VK_IMAGE_TYPE_1D](resources.html#VkImageType). |

If the combination of parameters to
`vkGetPhysicalDeviceImageFormatProperties` is not supported by the
implementation for use in [vkCreateImage](resources.html#vkCreateImage), then all members of
`VkImageFormatProperties` will be filled with zero.

|  | Filling `VkImageFormatProperties` with zero for unsupported formats is
| --- | --- |
an exception to the usual rule that output structures have **undefined**
contents on error.
This exception was unintentional, but is preserved for backwards
compatibility. |

To determine the image capabilities compatible with an external memory
handle type, call:

// Provided by VK_NV_external_memory_capabilities
VkResult vkGetPhysicalDeviceExternalImageFormatPropertiesNV(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkImageType                                 type,
    VkImageTiling                               tiling,
    VkImageUsageFlags                           usage,
    VkImageCreateFlags                          flags,
    VkExternalMemoryHandleTypeFlagsNV           externalHandleType,
    VkExternalImageFormatPropertiesNV*          pExternalImageFormatProperties);

* 
`physicalDevice` is the physical device from which to query the
image capabilities

* 
`format` is the image format, corresponding to
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`format`.

* 
`type` is the image type, corresponding to
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`imageType`.

* 
`tiling` is the image tiling, corresponding to
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`tiling`.

* 
`usage` is the intended usage of the image, corresponding to
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`usage`.

* 
`flags` is a bitmask describing additional parameters of the image,
corresponding to [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`.

* 
`externalHandleType` is either one of the bits from
[VkExternalMemoryHandleTypeFlagBitsNV](memory.html#VkExternalMemoryHandleTypeFlagBitsNV), or 0.

* 
`pExternalImageFormatProperties` is a pointer to a
[VkExternalImageFormatPropertiesNV](#VkExternalImageFormatPropertiesNV) structure in which capabilities
are returned.

If `externalHandleType` is 0,
`pExternalImageFormatProperties->imageFormatProperties` will return the
same values as a call to [vkGetPhysicalDeviceImageFormatProperties](#vkGetPhysicalDeviceImageFormatProperties), and
the other members of `pExternalImageFormatProperties` will all be 0.
Otherwise, they are filled in as described for
[VkExternalImageFormatPropertiesNV](#VkExternalImageFormatPropertiesNV).

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-externalHandleType-07721) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-externalHandleType-07721

`externalHandleType` **must** not have more than one bit set

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-format-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-type-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-type-parameter

 `type` **must** be a valid [VkImageType](resources.html#VkImageType) value

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-tiling-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](resources.html#VkImageTiling) value

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-usage-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits) values

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-usage-requiredbitmask) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-flags-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits](resources.html#VkImageCreateFlagBits) values

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-externalHandleType-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-externalHandleType-parameter

 `externalHandleType` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBitsNV](memory.html#VkExternalMemoryHandleTypeFlagBitsNV) values

* 
[](#VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-pExternalImageFormatProperties-parameter) VUID-vkGetPhysicalDeviceExternalImageFormatPropertiesNV-pExternalImageFormatProperties-parameter

 `pExternalImageFormatProperties` **must** be a valid pointer to a [VkExternalImageFormatPropertiesNV](#VkExternalImageFormatPropertiesNV) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkExternalImageFormatPropertiesNV` structure is defined as:

// Provided by VK_NV_external_memory_capabilities
typedef struct VkExternalImageFormatPropertiesNV {
    VkImageFormatProperties              imageFormatProperties;
    VkExternalMemoryFeatureFlagsNV       externalMemoryFeatures;
    VkExternalMemoryHandleTypeFlagsNV    exportFromImportedHandleTypes;
    VkExternalMemoryHandleTypeFlagsNV    compatibleHandleTypes;
} VkExternalImageFormatPropertiesNV;

* 
`imageFormatProperties` will be filled in as when calling
[vkGetPhysicalDeviceImageFormatProperties](#vkGetPhysicalDeviceImageFormatProperties), but the values returned
**may** vary depending on the external handle type requested.

* 
`externalMemoryFeatures` is a bitmask of
[VkExternalMemoryFeatureFlagBitsNV](#VkExternalMemoryFeatureFlagBitsNV), indicating properties of the
external memory handle type
([vkGetPhysicalDeviceExternalImageFormatPropertiesNV](#vkGetPhysicalDeviceExternalImageFormatPropertiesNV)::`externalHandleType`)
being queried, or 0 if the external memory handle type is 0.

* 
`exportFromImportedHandleTypes` is a bitmask of
[VkExternalMemoryHandleTypeFlagBitsNV](memory.html#VkExternalMemoryHandleTypeFlagBitsNV) containing a bit set for
every external handle type that **may** be used to create memory from which
the handles of the type specified in
[vkGetPhysicalDeviceExternalImageFormatPropertiesNV](#vkGetPhysicalDeviceExternalImageFormatPropertiesNV)::`externalHandleType`
**can** be exported, or 0 if the external memory handle type is 0.

* 
`compatibleHandleTypes` is a bitmask of
[VkExternalMemoryHandleTypeFlagBitsNV](memory.html#VkExternalMemoryHandleTypeFlagBitsNV) containing a bit set for
every external handle type that **may** be specified simultaneously with
the handle type specified by
[vkGetPhysicalDeviceExternalImageFormatPropertiesNV](#vkGetPhysicalDeviceExternalImageFormatPropertiesNV)::`externalHandleType`
when calling [vkAllocateMemory](memory.html#vkAllocateMemory), or 0 if the external memory handle
type is 0.
`compatibleHandleTypes` will always contain
[vkGetPhysicalDeviceExternalImageFormatPropertiesNV](#vkGetPhysicalDeviceExternalImageFormatPropertiesNV)::`externalHandleType`

Bits which **can** be set in
[VkExternalImageFormatPropertiesNV](#VkExternalImageFormatPropertiesNV)::`externalMemoryFeatures`,
indicating properties of the external memory handle type, are:

// Provided by VK_NV_external_memory_capabilities
typedef enum VkExternalMemoryFeatureFlagBitsNV {
    VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT_NV = 0x00000001,
    VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT_NV = 0x00000002,
    VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT_NV = 0x00000004,
} VkExternalMemoryFeatureFlagBitsNV;

* 
[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT_NV](#VkExternalMemoryFeatureFlagBitsNV) specifies that
external memory of the specified type **must** be created as a dedicated
allocation when used in the manner specified.

* 
[VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT_NV](#VkExternalMemoryFeatureFlagBitsNV) specifies that the
implementation supports exporting handles of the specified type.

* 
[VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT_NV](#VkExternalMemoryFeatureFlagBitsNV) specifies that the
implementation supports importing handles of the specified type.

// Provided by VK_NV_external_memory_capabilities
typedef VkFlags VkExternalMemoryFeatureFlagsNV;

`VkExternalMemoryFeatureFlagsNV` is a bitmask type for setting a mask of
zero or more [VkExternalMemoryFeatureFlagBitsNV](#VkExternalMemoryFeatureFlagBitsNV).

To query additional capabilities specific to image types, call:

// Provided by VK_VERSION_1_1
VkResult vkGetPhysicalDeviceImageFormatProperties2(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceImageFormatInfo2*     pImageFormatInfo,
    VkImageFormatProperties2*                   pImageFormatProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceImageFormatProperties2
VkResult vkGetPhysicalDeviceImageFormatProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceImageFormatInfo2*     pImageFormatInfo,
    VkImageFormatProperties2*                   pImageFormatProperties);

* 
`physicalDevice` is the physical device from which to query the
image capabilities.

* 
`pImageFormatInfo` is a pointer to a
[VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2) structure describing the
parameters that would be consumed by [vkCreateImage](resources.html#vkCreateImage).

* 
`pImageFormatProperties` is a pointer to a
[VkImageFormatProperties2](#VkImageFormatProperties2) structure in which capabilities are
returned.

`vkGetPhysicalDeviceImageFormatProperties2` behaves similarly to
[vkGetPhysicalDeviceImageFormatProperties](#vkGetPhysicalDeviceImageFormatProperties), with the ability to return
extended information in a `pNext` chain of output structures.

If the `pNext` chain of `pImageFormatInfo` includes a
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure with a `profileCount` member
greater than `0`, then this command returns format capabilities specific to
image types used in conjunction with the specified [video profiles](videocoding.html#video-profiles).
In this case, this command will return one of the
[video-profile-specific error codes](videocoding.html#video-profile-error-codes) if any of
the profiles specified via [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR)::`pProfiles`
are not supported.
Furthermore, if [VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2)::`usage` includes
any image usage flag not supported by the specified video profiles, then
this command returns [VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR](fundamentals.html#VkResult).

If the [`hostImageCopy`](features.html#features-hostImageCopy) feature is supported,
and:

* 
`pImageFormatInfo->usage` includes [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits)

* 
`pImageFormatInfo->flags` does not include either of
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](resources.html#VkImageCreateFlagBits), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](resources.html#VkImageCreateFlagBits)

* 
The `pNext` chain of `pImageFormatInfo` does not include a
[VkPhysicalDeviceExternalImageFormatInfo](#VkPhysicalDeviceExternalImageFormatInfo) structure with non-zero
`handleType`

* 
`pImageFormatInfo->tiling` is not
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](resources.html#VkImageTiling)

Then the result of calls to `vkGetPhysicalDeviceImageFormatProperties2`
with identical parameters except for the inclusion of
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits) in `pImageFormatInfo->usage`
**must** be identical.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties2-pNext-01868) VUID-vkGetPhysicalDeviceImageFormatProperties2-pNext-01868

If the `pNext` chain of `pImageFormatProperties` includes a
[VkAndroidHardwareBufferUsageANDROID](#VkAndroidHardwareBufferUsageANDROID) structure, the `pNext`
chain of `pImageFormatInfo` **must** include a
[VkPhysicalDeviceExternalImageFormatInfo](#VkPhysicalDeviceExternalImageFormatInfo) structure with
`handleType` set to
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties2-pNext-09004) VUID-vkGetPhysicalDeviceImageFormatProperties2-pNext-09004

If the `pNext` chain of `pImageFormatProperties` includes a
[VkHostImageCopyDevicePerformanceQuery](#VkHostImageCopyDevicePerformanceQuery) structure,
`pImageFormatInfo->usage` **must** contain
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties2-pImageFormatInfo-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties2-pImageFormatInfo-parameter

 `pImageFormatInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2) structure

* 
[](#VUID-vkGetPhysicalDeviceImageFormatProperties2-pImageFormatProperties-parameter) VUID-vkGetPhysicalDeviceImageFormatProperties2-pImageFormatProperties-parameter

 `pImageFormatProperties` **must** be a valid pointer to a [VkImageFormatProperties2](#VkImageFormatProperties2) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](fundamentals.html#VkResult)

* 
[VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_VIDEO_PROFILE_CODEC_NOT_SUPPORTED_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_VIDEO_PROFILE_FORMAT_NOT_SUPPORTED_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_VIDEO_PROFILE_OPERATION_NOT_SUPPORTED_KHR](fundamentals.html#VkResult)

The `VkPhysicalDeviceImageFormatInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceImageFormatInfo2 {
    VkStructureType       sType;
    const void*           pNext;
    VkFormat              format;
    VkImageType           type;
    VkImageTiling         tiling;
    VkImageUsageFlags     usage;
    VkImageCreateFlags    flags;
} VkPhysicalDeviceImageFormatInfo2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkPhysicalDeviceImageFormatInfo2
typedef VkPhysicalDeviceImageFormatInfo2 VkPhysicalDeviceImageFormatInfo2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.
The `pNext` chain of `VkPhysicalDeviceImageFormatInfo2` is used
to provide additional image parameters to
`vkGetPhysicalDeviceImageFormatProperties2`.

* 
`format` is a [VkFormat](formats.html#VkFormat) value indicating the image format,
corresponding to [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`format`.

* 
`type` is a [VkImageType](resources.html#VkImageType) value indicating the image type,
corresponding to [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`imageType`.

* 
`tiling` is a [VkImageTiling](resources.html#VkImageTiling) value indicating the image tiling,
corresponding to [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`tiling`.

* 
`usage` is a bitmask of [VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits) indicating the
intended usage of the image, corresponding to
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`usage`.

* 
`flags` is a bitmask of [VkImageCreateFlagBits](resources.html#VkImageCreateFlagBits) indicating
additional parameters of the image, corresponding to
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`.

The members of `VkPhysicalDeviceImageFormatInfo2` correspond to the
arguments to [vkGetPhysicalDeviceImageFormatProperties](#vkGetPhysicalDeviceImageFormatProperties), with
`sType` and `pNext` added for extensibility.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-tiling-02249) VUID-VkPhysicalDeviceImageFormatInfo2-tiling-02249

`tiling` **must** be [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](resources.html#VkImageTiling) if
and only if the `pNext` chain includes
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](#VkPhysicalDeviceImageDrmFormatModifierInfoEXT)

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-tiling-02313) VUID-VkPhysicalDeviceImageFormatInfo2-tiling-02313

If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](resources.html#VkImageTiling) and
`flags` contains [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](resources.html#VkImageCreateFlagBits), then the
`pNext` chain **must** include a [VkImageFormatListCreateInfo](resources.html#VkImageFormatListCreateInfo)
structure with non-zero `viewFormatCount`

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-sType-sType) VUID-VkPhysicalDeviceImageFormatInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_FORMAT_INFO_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-pNext-pNext) VUID-VkPhysicalDeviceImageFormatInfo2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDataGraphOpticalFlowImageFormatInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphOpticalFlowImageFormatInfoARM), [VkImageCompressionControlEXT](resources.html#VkImageCompressionControlEXT), [VkImageFormatListCreateInfo](resources.html#VkImageFormatListCreateInfo), [VkImageStencilUsageCreateInfo](resources.html#VkImageStencilUsageCreateInfo), [VkOpticalFlowImageFormatInfoNV](VK_NV_optical_flow/optical_flow.html#VkOpticalFlowImageFormatInfoNV), [VkPhysicalDeviceExternalImageFormatInfo](#VkPhysicalDeviceExternalImageFormatInfo), [VkPhysicalDeviceImageDrmFormatModifierInfoEXT](#VkPhysicalDeviceImageDrmFormatModifierInfoEXT), [VkPhysicalDeviceImageViewImageFormatInfoEXT](#VkPhysicalDeviceImageViewImageFormatInfoEXT), or [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR)

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-sType-unique) VUID-VkPhysicalDeviceImageFormatInfo2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-format-parameter) VUID-VkPhysicalDeviceImageFormatInfo2-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-type-parameter) VUID-VkPhysicalDeviceImageFormatInfo2-type-parameter

 `type` **must** be a valid [VkImageType](resources.html#VkImageType) value

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-tiling-parameter) VUID-VkPhysicalDeviceImageFormatInfo2-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](resources.html#VkImageTiling) value

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-usage-parameter) VUID-VkPhysicalDeviceImageFormatInfo2-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](resources.html#VkImageUsageFlagBits) values

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-usage-requiredbitmask) VUID-VkPhysicalDeviceImageFormatInfo2-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-VkPhysicalDeviceImageFormatInfo2-flags-parameter) VUID-VkPhysicalDeviceImageFormatInfo2-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits](resources.html#VkImageCreateFlagBits) values

The `VkImageFormatProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkImageFormatProperties2 {
    VkStructureType            sType;
    void*                      pNext;
    VkImageFormatProperties    imageFormatProperties;
} VkImageFormatProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkImageFormatProperties2
typedef VkImageFormatProperties2 VkImageFormatProperties2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.
The `pNext` chain of `VkImageFormatProperties2` is used to allow
the specification of additional capabilities to be returned from
`vkGetPhysicalDeviceImageFormatProperties2`.

* 
`imageFormatProperties` is a [VkImageFormatProperties](#VkImageFormatProperties) structure
in which capabilities are returned.

If the combination of parameters to
`vkGetPhysicalDeviceImageFormatProperties2` is not supported by the
implementation for use in [vkCreateImage](resources.html#vkCreateImage), then all members of
`imageFormatProperties` will be filled with zero.

|  | Filling `imageFormatProperties` with zero for unsupported formats is an
| --- | --- |
exception to the usual rule that output structures have **undefined** contents
on error.
This exception was unintentional, but is preserved for backwards
compatibility.
This exception only applies to `imageFormatProperties`, not `sType`,
`pNext`, or any structures chained from `pNext`. |

Valid Usage (Implicit)

* 
[](#VUID-VkImageFormatProperties2-sType-sType) VUID-VkImageFormatProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_FORMAT_PROPERTIES_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageFormatProperties2-pNext-pNext) VUID-VkImageFormatProperties2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAndroidHardwareBufferUsageANDROID](#VkAndroidHardwareBufferUsageANDROID), [VkExternalImageFormatProperties](#VkExternalImageFormatProperties), [VkFilterCubicImageViewImageFormatPropertiesEXT](#VkFilterCubicImageViewImageFormatPropertiesEXT), [VkHostImageCopyDevicePerformanceQuery](#VkHostImageCopyDevicePerformanceQuery), [VkImageCompressionPropertiesEXT](resources.html#VkImageCompressionPropertiesEXT), [VkNativeBufferUsageOHOS](resources.html#VkNativeBufferUsageOHOS), [VkSamplerYcbcrConversionImageFormatProperties](#VkSamplerYcbcrConversionImageFormatProperties), [VkSubsampledImageFormatPropertiesEXT](#VkSubsampledImageFormatPropertiesEXT), or [VkTextureLODGatherFormatPropertiesAMD](#VkTextureLODGatherFormatPropertiesAMD)

* 
[](#VUID-VkImageFormatProperties2-sType-unique) VUID-VkImageFormatProperties2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

To determine if texture gather functions that take explicit LOD and/or bias
argument values **can** be used with a given image format, add a
[VkTextureLODGatherFormatPropertiesAMD](#VkTextureLODGatherFormatPropertiesAMD) structure to the `pNext`
chain of the [VkImageFormatProperties2](#VkImageFormatProperties2) structure in a call to
`vkGetPhysicalDeviceImageFormatProperties2`.

The `VkTextureLODGatherFormatPropertiesAMD` structure is defined as:

// Provided by VK_AMD_texture_gather_bias_lod
typedef struct VkTextureLODGatherFormatPropertiesAMD {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           supportsTextureGatherLODBiasAMD;
} VkTextureLODGatherFormatPropertiesAMD;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`supportsTextureGatherLODBiasAMD` tells if the image format can be
used with texture gather bias/LOD functions, as introduced by the
`[VK_AMD_texture_gather_bias_lod](../appendices/extensions.html#VK_AMD_texture_gather_bias_lod)` extension.
This field is set by the implementation.
An application-specified value is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkTextureLODGatherFormatPropertiesAMD-sType-sType) VUID-VkTextureLODGatherFormatPropertiesAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TEXTURE_LOD_GATHER_FORMAT_PROPERTIES_AMD](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](#VkImageFormatProperties2)

To determine the image capabilities compatible with an external memory
handle type, add a [VkPhysicalDeviceExternalImageFormatInfo](#VkPhysicalDeviceExternalImageFormatInfo) structure
to the `pNext` chain of the [VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2)
structure and a `VkExternalImageFormatProperties` structure to the
`pNext` chain of the [VkImageFormatProperties2](#VkImageFormatProperties2) structure.

The `VkPhysicalDeviceExternalImageFormatInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceExternalImageFormatInfo {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkPhysicalDeviceExternalImageFormatInfo;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkPhysicalDeviceExternalImageFormatInfo
typedef VkPhysicalDeviceExternalImageFormatInfo VkPhysicalDeviceExternalImageFormatInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](#VkExternalMemoryHandleTypeFlagBits) value
specifying the memory handle type that will be used with the memory
associated with the image.

If `handleType` is 0, [vkGetPhysicalDeviceImageFormatProperties2](#vkGetPhysicalDeviceImageFormatProperties2)
will behave as if [VkPhysicalDeviceExternalImageFormatInfo](#VkPhysicalDeviceExternalImageFormatInfo) was not
present, and [VkExternalImageFormatProperties](#VkExternalImageFormatProperties) will be ignored.

If `handleType` is not compatible with the `format`, `type`,
`tiling`, `usage`, and `flags` specified in
[VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2), then
[vkGetPhysicalDeviceImageFormatProperties2](#vkGetPhysicalDeviceImageFormatProperties2) returns
[VK_ERROR_FORMAT_NOT_SUPPORTED](fundamentals.html#VkResult).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalImageFormatInfo-sType-sType) VUID-VkPhysicalDeviceExternalImageFormatInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_IMAGE_FORMAT_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceExternalImageFormatInfo-handleType-parameter) VUID-VkPhysicalDeviceExternalImageFormatInfo-handleType-parameter

 If `handleType` is not `0`, `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](#VkExternalMemoryHandleTypeFlagBits) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2)

Possible values of
[VkPhysicalDeviceExternalImageFormatInfo](#VkPhysicalDeviceExternalImageFormatInfo)::`handleType`, specifying
an external memory handle type, are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalMemoryHandleTypeFlagBits {
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT = 0x00000001,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT = 0x00000002,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT = 0x00000004,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT = 0x00000008,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT = 0x00000010,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT = 0x00000020,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT = 0x00000040,
  // Provided by VK_EXT_external_memory_dma_buf
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT = 0x00000200,
  // Provided by VK_ANDROID_external_memory_android_hardware_buffer
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID = 0x00000400,
  // Provided by VK_EXT_external_memory_host
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_external_memory_host
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT = 0x00000100,
  // Provided by VK_FUCHSIA_external_memory
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA = 0x00000800,
  // Provided by VK_NV_external_memory_rdma
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_RDMA_ADDRESS_BIT_NV = 0x00001000,
  // Provided by VK_OHOS_external_memory
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OH_NATIVE_BUFFER_BIT_OHOS = 0x00008000,
  // Provided by VK_QNX_external_memory_screen_buffer
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX = 0x00004000,
  // Provided by VK_EXT_external_memory_metal
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT = 0x00010000,
  // Provided by VK_EXT_external_memory_metal
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT = 0x00020000,
  // Provided by VK_EXT_external_memory_metal
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT = 0x00040000,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT_KHR = VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT,
} VkExternalMemoryHandleTypeFlagBits;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalMemoryHandleTypeFlagBits
typedef VkExternalMemoryHandleTypeFlagBits VkExternalMemoryHandleTypeFlagBitsKHR;

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) specifies a POSIX
file descriptor handle that has only limited valid usage outside of
Vulkan and other compatible APIs.
It **must** be compatible with the POSIX system calls `dup`, `dup2`,
`close`, and the non-standard system call `dup3`.
Additionally, it **must** be transportable over a socket using an
`SCM_RIGHTS` control message.
It owns a reference to the underlying memory resource represented by its
Vulkan memory object.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) specifies an NT
handle that has only limited valid usage outside of Vulkan and other
compatible APIs.
It **must** be compatible with the functions `DuplicateHandle`,
`CloseHandle`, `CompareObjectHandles`, `GetHandleInformation`,
and `SetHandleInformation`.
It owns a reference to the underlying memory resource represented by its
Vulkan memory object.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) specifies a
global share handle that has only limited valid usage outside of Vulkan
and other compatible APIs.
It is not compatible with any native APIs.
It does not own a reference to the underlying memory resource
represented by its Vulkan memory object, and will therefore become
invalid when all Vulkan memory objects associated with it are destroyed.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) specifies an NT
handle returned by `IDXGIResource1`::`CreateSharedHandle`
referring to a Direct3D 10 or 11 texture resource.
It owns a reference to the memory used by the Direct3D resource.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) specifies a
global share handle returned by `IDXGIResource`::`GetSharedHandle`
referring to a Direct3D 10 or 11 texture resource.
It does not own a reference to the underlying Direct3D resource, and
will therefore become invalid when all Vulkan memory objects and
Direct3D resources associated with it are destroyed.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) specifies an NT
handle returned by `ID3D12Device`::`CreateSharedHandle` referring
to a Direct3D 12 heap resource.
It owns a reference to the resources used by the Direct3D heap.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) specifies an NT
handle returned by `ID3D12Device`::`CreateSharedHandle` referring
to a Direct3D 12 committed resource.
It owns a reference to the memory used by the Direct3D resource.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) specifies a
host pointer returned by a host memory allocation command.
It does not own a reference to the underlying memory resource, and will
therefore become invalid if the host memory is freed.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR)
specifies a host pointer to *host mapped foreign memory*.
It does not own a reference to the underlying memory resource, and will
therefore become invalid if the foreign memory is unmapped or otherwise
becomes no longer available.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) is a file
descriptor for a Linux dma_buf.
It owns a reference to the underlying memory resource represented by its
Vulkan memory object.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](#VkExternalMemoryHandleTypeFlagBitsKHR)
specifies an `AHardwareBuffer` object defined by the Android NDK.
See [Android Hardware Buffers](memory.html#memory-external-android-hardware-buffer)
for more details of this handle type.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](#VkExternalMemoryHandleTypeFlagBitsKHR) is a Zircon
handle to a virtual memory object.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_RDMA_ADDRESS_BIT_NV](#VkExternalMemoryHandleTypeFlagBitsKHR) is a handle to
an allocation accessible by remote devices.
It owns a reference to the underlying memory resource represented by its
Vulkan memory object.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](#VkExternalMemoryHandleTypeFlagBitsKHR) specifies a
`_screen_buffer` object defined by the QNX SDP.
See [QNX Screen Buffer](memory.html#memory-external-qnx-screen-buffer) for more
details of this handle type.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) is a handle to a
`MTLResource` holding a `MTLBuffer`.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) is a handle to a
`MTLResource` holding a `MTLTexture`.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) is a handle to a
`MTLResource` holding a `MTLHeap`.

Some external memory handle types can only be shared within the same
underlying physical device and/or the same driver version, as defined in the
following table:

| Handle type | `VkPhysicalDeviceIDProperties`::`driverUUID` | `VkPhysicalDeviceIDProperties`::`deviceUUID` |
| --- | --- | --- |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](#VkExternalMemoryHandleTypeFlagBitsKHR) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](#VkExternalMemoryHandleTypeFlagBitsKHR) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_RDMA_ADDRESS_BIT_NV](#VkExternalMemoryHandleTypeFlagBitsKHR) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](#VkExternalMemoryHandleTypeFlagBitsKHR) | No restriction | No restriction |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) | No restriction | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) | No restriction | Must match |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) | No restriction | Must match |

|  | The above table does not restrict the drivers and devices with which
| --- | --- |
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) and
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) **may**
be shared, as these handle types inherently mean memory that does not come
from the same device, as they import memory from the host or a foreign
device, respectively. |

|  | Even though the above table does not restrict the drivers and devices with
| --- | --- |
which [VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR) **may** be shared,
query mechanisms exist in the Vulkan API that prevent the import of
incompatible dma-bufs (such as [vkGetMemoryFdPropertiesKHR](memory.html#vkGetMemoryFdPropertiesKHR)) and that
prevent incompatible usage of dma-bufs (such as
[VkPhysicalDeviceExternalBufferInfo](#VkPhysicalDeviceExternalBufferInfo) and
[VkPhysicalDeviceExternalImageFormatInfo](#VkPhysicalDeviceExternalImageFormatInfo)). |

// Provided by VK_VERSION_1_1
typedef VkFlags VkExternalMemoryHandleTypeFlags;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalMemoryHandleTypeFlags
typedef VkExternalMemoryHandleTypeFlags VkExternalMemoryHandleTypeFlagsKHR;

`VkExternalMemoryHandleTypeFlags` is a bitmask type for setting a mask
of zero or more [VkExternalMemoryHandleTypeFlagBits](#VkExternalMemoryHandleTypeFlagBits).

The `VkExternalImageFormatProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalImageFormatProperties {
    VkStructureType               sType;
    void*                         pNext;
    VkExternalMemoryProperties    externalMemoryProperties;
} VkExternalImageFormatProperties;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalImageFormatProperties
typedef VkExternalImageFormatProperties VkExternalImageFormatPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalMemoryProperties` is a [VkExternalMemoryProperties](#VkExternalMemoryProperties)
structure specifying various capabilities of the external handle type
when used with the specified image creation parameters.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalImageFormatProperties-sType-sType) VUID-VkExternalImageFormatProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_IMAGE_FORMAT_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](#VkImageFormatProperties2)

The `VkExternalMemoryProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalMemoryProperties {
    VkExternalMemoryFeatureFlags       externalMemoryFeatures;
    VkExternalMemoryHandleTypeFlags    exportFromImportedHandleTypes;
    VkExternalMemoryHandleTypeFlags    compatibleHandleTypes;
} VkExternalMemoryProperties;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalMemoryProperties
typedef VkExternalMemoryProperties VkExternalMemoryPropertiesKHR;

* 
`externalMemoryFeatures` is a bitmask of
[VkExternalMemoryFeatureFlagBits](#VkExternalMemoryFeatureFlagBits) specifying the features of
`handleType`.

* 
`exportFromImportedHandleTypes` is a bitmask of
[VkExternalMemoryHandleTypeFlagBits](#VkExternalMemoryHandleTypeFlagBits) specifying which types of
imported handle `handleType` **can** be exported from.

* 
`compatibleHandleTypes` is a bitmask of
[VkExternalMemoryHandleTypeFlagBits](#VkExternalMemoryHandleTypeFlagBits) specifying handle types which
**can** be specified at the same time as `handleType` when creating an
image compatible with external memory.

`compatibleHandleTypes` **must** include at least `handleType`.
Inclusion of a handle type in `compatibleHandleTypes` does not imply the
values returned in [VkImageFormatProperties2](#VkImageFormatProperties2) will be the same when
[VkPhysicalDeviceExternalImageFormatInfo](#VkPhysicalDeviceExternalImageFormatInfo)::`handleType` is set to
that type.
The application is responsible for querying the capabilities of all handle
types intended for concurrent use in a single image and intersecting them to
obtain the compatible set of capabilities.

Bits which **may** be set in
[VkExternalMemoryProperties](#VkExternalMemoryProperties)::`externalMemoryFeatures`, specifying
features of an external memory handle type, are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalMemoryFeatureFlagBits {
    VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT = 0x00000001,
    VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT = 0x00000002,
    VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT = 0x00000004,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT_KHR = VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT_KHR = VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT,
  // Provided by VK_KHR_external_memory_capabilities
    VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT_KHR = VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT,
} VkExternalMemoryFeatureFlagBits;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalMemoryFeatureFlagBits
typedef VkExternalMemoryFeatureFlagBits VkExternalMemoryFeatureFlagBitsKHR;

* 
[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT](#VkExternalMemoryFeatureFlagBitsKHR) specifies that
tensors,
    images or buffers created with the specified parameters and handle type
    **must** use the mechanisms defined by [VkMemoryDedicatedRequirements](resources.html#VkMemoryDedicatedRequirements)
    and [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)
or [VkMemoryDedicatedAllocateInfoTensorARM](memory.html#VkMemoryDedicatedAllocateInfoTensorARM)
    to create (or import) a dedicated allocation for the
tensor,
    image or buffer.

* 
[VK_EXTERNAL_MEMORY_FEATURE_EXPORTABLE_BIT](#VkExternalMemoryFeatureFlagBitsKHR) specifies that handles
of this type **can** be exported from Vulkan memory objects.

* 
[VK_EXTERNAL_MEMORY_FEATURE_IMPORTABLE_BIT](#VkExternalMemoryFeatureFlagBitsKHR) specifies that handles
of this type **can** be imported as Vulkan memory objects.

Because their semantics in external APIs roughly align with that of an image
or buffer with a dedicated allocation in Vulkan, implementations are
**required** to report [VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT](#VkExternalMemoryFeatureFlagBitsKHR) for
the following external handle types:

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](#VkExternalMemoryHandleTypeFlagBitsKHR)
for images only

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](#VkExternalMemoryHandleTypeFlagBitsKHR) for images
only

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR)

Implementations **must** not report
[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT](#VkExternalMemoryFeatureFlagBitsKHR) for buffers with
external handle type
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](#VkExternalMemoryHandleTypeFlagBitsKHR).
Implementations **must** not report
[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT](#VkExternalMemoryFeatureFlagBitsKHR) for buffers with
external handle type
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](#VkExternalMemoryHandleTypeFlagBitsKHR).
Implementations **must** not report
[VK_EXTERNAL_MEMORY_FEATURE_DEDICATED_ONLY_BIT](#VkExternalMemoryFeatureFlagBitsKHR) for
tensors,
images or buffers with external handle type
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR), or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](#VkExternalMemoryHandleTypeFlagBitsKHR).

// Provided by VK_VERSION_1_1
typedef VkFlags VkExternalMemoryFeatureFlags;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalMemoryFeatureFlags
typedef VkExternalMemoryFeatureFlags VkExternalMemoryFeatureFlagsKHR;

`VkExternalMemoryFeatureFlags` is a bitmask type for setting a mask of
zero or more [VkExternalMemoryFeatureFlagBits](#VkExternalMemoryFeatureFlagBits).

To query the image capabilities that are compatible with a
[Linux DRM format modifier](../appendices/glossary.html#glossary-drm-format-modifier), set
[VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2)::`tiling` to
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](resources.html#VkImageTiling) and add a
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](#VkPhysicalDeviceImageDrmFormatModifierInfoEXT) structure to the
`pNext` chain of [VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2).

The [VkPhysicalDeviceImageDrmFormatModifierInfoEXT](#VkPhysicalDeviceImageDrmFormatModifierInfoEXT) structure is defined
as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkPhysicalDeviceImageDrmFormatModifierInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           drmFormatModifier;
    VkSharingMode      sharingMode;
    uint32_t           queueFamilyIndexCount;
    const uint32_t*    pQueueFamilyIndices;
} VkPhysicalDeviceImageDrmFormatModifierInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifier` is the image’s *Linux DRM format modifier*,
corresponding to
[VkImageDrmFormatModifierExplicitCreateInfoEXT](resources.html#VkImageDrmFormatModifierExplicitCreateInfoEXT)::`drmFormatModifier`
or to
[VkImageDrmFormatModifierListCreateInfoEXT](resources.html#VkImageDrmFormatModifierListCreateInfoEXT)::`pDrmFormatModifiers`.

* 
`sharingMode` specifies how the image will be accessed by multiple
queue families.

* 
`queueFamilyIndexCount` is the number of entries in the
`pQueueFamilyIndices` array.

* 
`pQueueFamilyIndices` is a pointer to an array of queue families
that will access the image.
It is ignored if `sharingMode` is not
[VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode).

If the `drmFormatModifier` is incompatible with the parameters specified
in [VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2) and its `pNext` chain, then
[vkGetPhysicalDeviceImageFormatProperties2](#vkGetPhysicalDeviceImageFormatProperties2) returns
[VK_ERROR_FORMAT_NOT_SUPPORTED](fundamentals.html#VkResult).
The implementation **must** support the query of any `drmFormatModifier`,
including unknown and invalid modifier values.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02314) VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02314

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode), then
`pQueueFamilyIndices` **must** be a valid pointer to an array of
`queueFamilyIndexCount` `uint32_t` values

* 
[](#VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02315) VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02315

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode), then
`queueFamilyIndexCount` **must** be greater than `1`

* 
[](#VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02316) VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-02316

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](resources.html#VkSharingMode), each element
of `pQueueFamilyIndices` **must** be unique and **must** be less than the
`pQueueFamilyPropertyCount` returned by
[vkGetPhysicalDeviceQueueFamilyProperties2](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties2) for the
`physicalDevice` that was used to create `device`

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sType-sType) VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_DRM_FORMAT_MODIFIER_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-parameter) VUID-VkPhysicalDeviceImageDrmFormatModifierInfoEXT-sharingMode-parameter

 `sharingMode` **must** be a valid [VkSharingMode](resources.html#VkSharingMode) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2)

To determine the number of combined image samplers required to support a
[multi-planar format](formats.html#formats-multiplanar), add
[VkSamplerYcbcrConversionImageFormatProperties](#VkSamplerYcbcrConversionImageFormatProperties) to the `pNext` chain
of the [VkImageFormatProperties2](#VkImageFormatProperties2) structure in a call to
`vkGetPhysicalDeviceImageFormatProperties2`.

The `VkSamplerYcbcrConversionImageFormatProperties` structure is defined
as:

// Provided by VK_VERSION_1_1
typedef struct VkSamplerYcbcrConversionImageFormatProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           combinedImageSamplerDescriptorCount;
} VkSamplerYcbcrConversionImageFormatProperties;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrConversionImageFormatProperties
typedef VkSamplerYcbcrConversionImageFormatProperties VkSamplerYcbcrConversionImageFormatPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`combinedImageSamplerDescriptorCount` is the number of combined
image sampler descriptors that the implementation uses to access the
format.

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerYcbcrConversionImageFormatProperties-sType-sType) VUID-VkSamplerYcbcrConversionImageFormatProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_IMAGE_FORMAT_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](#VkImageFormatProperties2)

`combinedImageSamplerDescriptorCount` is a number between 1 and the
number of planes in the format.
A descriptor set layout binding with immutable Y′CBCR conversion samplers
will have a maximum `combinedImageSamplerDescriptorCount` which is the
maximum across all formats supported by its samplers of the
`combinedImageSamplerDescriptorCount` for each format.
Descriptor sets with that layout will internally use that maximum
`combinedImageSamplerDescriptorCount` descriptors for each descriptor in
the binding.
This expanded number of descriptors will be consumed from the descriptor
pool when a descriptor set is allocated, and counts towards the
`maxDescriptorSetSamplers`, `maxDescriptorSetSampledImages`,
`maxPerStageDescriptorSamplers`, and
`maxPerStageDescriptorSampledImages` limits.

|  | All descriptors in a binding use the same maximum
| --- | --- |
`combinedImageSamplerDescriptorCount` descriptors to allow
implementations to use a uniform stride for dynamic indexing of the
descriptors in the binding.

For example, consider a descriptor set layout binding with two descriptors
and immutable samplers for [multi-planar formats](formats.html#formats-multiplanar)
that have
`VkSamplerYcbcrConversionImageFormatProperties`::`combinedImageSamplerDescriptorCount`
values of `2` and `3` respectively.
There are two descriptors in the binding and the maximum
`combinedImageSamplerDescriptorCount` is `3`, so descriptor sets with
this layout consume `6` descriptors from the descriptor pool.
To create a descriptor pool that allows allocating four descriptor sets with
this layout, `descriptorCount` must be at least `24`. |

Instead of querying all the potential formats that the application might use
in the descriptor layout, the application **can** use the
[VkPhysicalDeviceMaintenance6Properties](limits.html#VkPhysicalDeviceMaintenance6Properties)::`maxCombinedImageSamplerDescriptorCount`
property to determine the maximum descriptor size that will accommodate any
and all [formats that require a sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the implementation.

To determine the number of image descriptors required to support a
subsampled image created with [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits), add
[VkSubsampledImageFormatPropertiesEXT](#VkSubsampledImageFormatPropertiesEXT) to the `pNext` chain of the
[VkImageFormatProperties2](#VkImageFormatProperties2) structure in a call to
`vkGetPhysicalDeviceImageFormatProperties2`.

The `VkSubsampledImageFormatPropertiesEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap with VK_EXT_fragment_density_map
typedef struct VkSubsampledImageFormatPropertiesEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           subsampledImageDescriptorCount;
} VkSubsampledImageFormatPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`subsampledImageDescriptorCount` is the number of image descriptors
that the implementation uses to access the image.

Valid Usage (Implicit)

* 
[](#VUID-VkSubsampledImageFormatPropertiesEXT-sType-sType) VUID-VkSubsampledImageFormatPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBSAMPLED_IMAGE_FORMAT_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](#VkImageFormatProperties2)

To obtain optimal Android hardware buffer usage flags for specific image
creation parameters, add a `VkAndroidHardwareBufferUsageANDROID`
structure to the `pNext` chain of a [VkImageFormatProperties2](#VkImageFormatProperties2)
structure passed to [vkGetPhysicalDeviceImageFormatProperties2](#vkGetPhysicalDeviceImageFormatProperties2).
This structure is defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkAndroidHardwareBufferUsageANDROID {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           androidHardwareBufferUsage;
} VkAndroidHardwareBufferUsageANDROID;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`androidHardwareBufferUsage` returns the Android hardware buffer
usage flags.

The `androidHardwareBufferUsage` field **must** include Android hardware
buffer usage flags listed in the
[AHardwareBuffer Usage Equivalence](memory.html#memory-external-android-hardware-buffer-usage) table when the corresponding Vulkan image usage or image
creation flags are included in the `usage` or `flags` fields of
[VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2).
It **must** include at least one GPU usage flag
(`AHARDWAREBUFFER_USAGE_GPU_*`), even if none of the corresponding Vulkan
usages or flags are requested.

|  | Requiring at least one GPU usage flag ensures that Android hardware buffer
| --- | --- |
memory will be allocated in a memory pool accessible to the Vulkan
implementation, and that specializing the memory layout based on usage flags
does not prevent it from being compatible with Vulkan.
Implementations **may** avoid unnecessary restrictions caused by this
requirement by using vendor usage flags to indicate that only the Vulkan
uses indicated in [VkImageFormatProperties2](#VkImageFormatProperties2) are required. |

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidHardwareBufferUsageANDROID-sType-sType) VUID-VkAndroidHardwareBufferUsageANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_USAGE_ANDROID](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](#VkImageFormatProperties2)

To query if using [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits) has a negative
impact on device performance when accessing an image, add
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits) to
[VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2)::`usage`, and add a
`VkHostImageCopyDevicePerformanceQuery` structure to the `pNext`
chain of a [VkImageFormatProperties2](#VkImageFormatProperties2) structure passed to
[vkGetPhysicalDeviceImageFormatProperties2](#vkGetPhysicalDeviceImageFormatProperties2).
This structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkHostImageCopyDevicePerformanceQuery {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           optimalDeviceAccess;
    VkBool32           identicalMemoryLayout;
} VkHostImageCopyDevicePerformanceQuery;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkHostImageCopyDevicePerformanceQuery
typedef VkHostImageCopyDevicePerformanceQuery VkHostImageCopyDevicePerformanceQueryEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`optimalDeviceAccess` returns [VK_TRUE](fundamentals.html#VK_TRUE) if use of host image
copy has no adverse effect on device access performance, compared to an
image that is created with exact same creation parameters, and bound to
the same [VkDeviceMemory](memory.html#VkDeviceMemory), except that the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits) usage flag is replaced with
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](resources.html#VkImageUsageFlagBits) and
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits).

* 
`identicalMemoryLayout` returns [VK_TRUE](fundamentals.html#VK_TRUE) if use of host image
copy has no impact on memory layout compared to an image that is created
with exact same creation parameters, and bound to the same
[VkDeviceMemory](memory.html#VkDeviceMemory), except that the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits) usage flag is replaced with
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](resources.html#VkImageUsageFlagBits) and
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits).

The implementation **may** return [VK_FALSE](fundamentals.html#VK_FALSE) in `optimalDeviceAccess`
if `identicalMemoryLayout` is [VK_FALSE](fundamentals.html#VK_FALSE).
If `identicalMemoryLayout` is [VK_TRUE](fundamentals.html#VK_TRUE), `optimalDeviceAccess`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE).

The implementation **may** return [VK_TRUE](fundamentals.html#VK_TRUE) in `optimalDeviceAccess`
while `identicalMemoryLayout` is [VK_FALSE](fundamentals.html#VK_FALSE).
In this situation, any device performance impact **should** not be measurable.

If [VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2)::`format` is a
block-compressed format and [vkGetPhysicalDeviceImageFormatProperties2](#vkGetPhysicalDeviceImageFormatProperties2)
returns [VK_SUCCESS](fundamentals.html#VkResult), the implementation **must** return [VK_TRUE](fundamentals.html#VK_TRUE) in
`optimalDeviceAccess`.

|  | Applications can make use of `optimalDeviceAccess` to determine their
| --- | --- |
resource copying strategy.
If a resource is expected to be accessed more on device than on the host,
and the implementation considers the resource sub-optimally accessed, it is
likely better to use device copies instead. |

|  | Layout not being identical yet still considered optimal for device access
| --- | --- |
could happen if the implementation has different memory layout patterns,
some of which are easier to access on the host. |

|  | The most practical reason for `optimalDeviceAccess` to be [VK_FALSE](fundamentals.html#VK_FALSE)
| --- | --- |
is that host image access may disable framebuffer compression where it would
otherwise have been enabled.
This represents far more efficient host image access since no compression
algorithm is required to read or write to the image, but it would impact
device access performance.
Some implementations may only set `optimalDeviceAccess` to
[VK_FALSE](fundamentals.html#VK_FALSE) if certain conditions are met, such as specific image usage
flags or creation flags. |

Valid Usage (Implicit)

* 
[](#VUID-VkHostImageCopyDevicePerformanceQuery-sType-sType) VUID-VkHostImageCopyDevicePerformanceQuery-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_HOST_IMAGE_COPY_DEVICE_PERFORMANCE_QUERY](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](#VkImageFormatProperties2)

To determine if cubic filtering can be used with a given image format and a
given image view type add a
[VkPhysicalDeviceImageViewImageFormatInfoEXT](#VkPhysicalDeviceImageViewImageFormatInfoEXT) structure to the
`pNext` chain of the [VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2) structure,
and a [VkFilterCubicImageViewImageFormatPropertiesEXT](#VkFilterCubicImageViewImageFormatPropertiesEXT) structure to the
`pNext` chain of the [VkImageFormatProperties2](#VkImageFormatProperties2) structure.

The `VkPhysicalDeviceImageViewImageFormatInfoEXT` structure is defined
as:

// Provided by VK_EXT_filter_cubic
typedef struct VkPhysicalDeviceImageViewImageFormatInfoEXT {
    VkStructureType    sType;
    void*              pNext;
    VkImageViewType    imageViewType;
} VkPhysicalDeviceImageViewImageFormatInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageViewType` is a [VkImageViewType](resources.html#VkImageViewType) value specifying the type
of the image view.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageViewImageFormatInfoEXT-sType-sType) VUID-VkPhysicalDeviceImageViewImageFormatInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_VIEW_IMAGE_FORMAT_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceImageViewImageFormatInfoEXT-imageViewType-parameter) VUID-VkPhysicalDeviceImageViewImageFormatInfoEXT-imageViewType-parameter

 `imageViewType` **must** be a valid [VkImageViewType](resources.html#VkImageViewType) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2)

The `VkFilterCubicImageViewImageFormatPropertiesEXT` structure is
defined as:

// Provided by VK_EXT_filter_cubic
typedef struct VkFilterCubicImageViewImageFormatPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           filterCubic;
    VkBool32           filterCubicMinmax;
} VkFilterCubicImageViewImageFormatPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`filterCubic` tells if image format, image type and image view type
**can** be used with cubic filtering.
This field is set by the implementation.
An application-specified value is ignored.

* 
`filterCubicMinmax` tells if image format, image type and image view
type **can** be used with cubic filtering and minmax filtering.
This field is set by the implementation.
An application-specified value is ignored.

Valid Usage (Implicit)

* 
[](#VUID-VkFilterCubicImageViewImageFormatPropertiesEXT-sType-sType) VUID-VkFilterCubicImageViewImageFormatPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FILTER_CUBIC_IMAGE_VIEW_IMAGE_FORMAT_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](#VkImageFormatProperties2)

Valid Usage

* 
[](#VUID-VkFilterCubicImageViewImageFormatPropertiesEXT-pNext-02627) VUID-VkFilterCubicImageViewImageFormatPropertiesEXT-pNext-02627

If the `pNext` chain of the [VkImageFormatProperties2](#VkImageFormatProperties2) structure
includes a [VkFilterCubicImageViewImageFormatPropertiesEXT](#VkFilterCubicImageViewImageFormatPropertiesEXT)
structure, the `pNext` chain of the
[VkPhysicalDeviceImageFormatInfo2](#VkPhysicalDeviceImageFormatInfo2) structure **must** include a
[VkPhysicalDeviceImageViewImageFormatInfoEXT](#VkPhysicalDeviceImageViewImageFormatInfoEXT) structure with an
`imageViewType` that is compatible with `imageType`

`vkGetPhysicalDeviceImageFormatProperties` returns a bitmask of
[VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) in `sampleCounts` specifying the supported
sample counts for the image parameters.

`sampleCounts` will be [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) if at least one of
the following conditions is true:

* 
`tiling` is [VK_IMAGE_TILING_LINEAR](resources.html#VkImageTiling)

* 
`type` is not [VK_IMAGE_TYPE_2D](resources.html#VkImageType)

* 
`flags` contains [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits)

* 
Neither the [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits) flag nor the
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits) flag in
`VkFormatProperties`::`optimalTilingFeatures` returned by
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) is set

* 
[VkPhysicalDeviceExternalImageFormatInfo](#VkPhysicalDeviceExternalImageFormatInfo)::`handleType` is an
external handle type for which multisampled image support is not
required.

* 
`format` is one of the [    formats that require a sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion)

* 
`usage` contains
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](resources.html#VkImageUsageFlagBits)

* 
`usage` contains [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](resources.html#VkImageUsageFlagBits)

Otherwise, the bits set in `sampleCounts` will be the sample counts
supported for the specified values of `usage` and `format`.
For each bit set in `usage`, the supported sample counts relate to the
limits in `VkPhysicalDeviceLimits` as follows:

* 
If `usage` includes [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) and
`format` is a floating- or fixed-point color format, a superset of
`VkPhysicalDeviceLimits`::`framebufferColorSampleCounts`

* 
If `usage` includes [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) and
`format` is an integer format, a superset of
`VkPhysicalDeviceVulkan12Properties`::`framebufferIntegerColorSampleCounts`

* 
If `usage` includes
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits), and `format`
includes a depth component, a superset of
`VkPhysicalDeviceLimits`::`framebufferDepthSampleCounts`

* 
If `usage` includes
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits), and `format`
includes a stencil component, a superset of
`VkPhysicalDeviceLimits`::`framebufferStencilSampleCounts`

* 
If `usage` includes [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), and
`format` includes a color component, a superset of
`VkPhysicalDeviceLimits`::`sampledImageColorSampleCounts`

* 
If `usage` includes [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), and
`format` includes a depth component, a superset of
`VkPhysicalDeviceLimits`::`sampledImageDepthSampleCounts`

* 
If `usage` includes [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits), and
`format` is an integer format, a superset of
`VkPhysicalDeviceLimits`::`sampledImageIntegerSampleCounts`

* 
If `usage` includes [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits), a superset of
`VkPhysicalDeviceLimits`::`storageImageSampleCounts`

If multiple bits are set in `usage`, `sampleCounts` will be the
intersection of the per-usage values described above.

If none of the bits described above are set in `usage`, then there is no
corresponding limit in `VkPhysicalDeviceLimits`.
In this case, `sampleCounts` **must** include at least
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits).

Implementations **may** support extent values larger than the [required minimum/maximum values](limits.html#limits-minmax) for certain types of images.
[VkImageFormatProperties](#VkImageFormatProperties)::`maxExtent` for each type is subject to
the constraints below.

|  | Implementations **must** support images with dimensions up to the
| --- | --- |
[required minimum/maximum values](limits.html#limits-minmax) for all types of images.
It follows that the query for additional capabilities **must** return extent
values that are at least as large as the required values. |

For [VK_IMAGE_TYPE_1D](resources.html#VkImageType):

* 
`maxExtent.width` ≥
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageDimension1D`

* 
`maxExtent.height` = 1

* 
`maxExtent.depth` = 1

For [VK_IMAGE_TYPE_2D](resources.html#VkImageType) when `flags` does not contain
[VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits):

* 
`maxExtent.width` ≥
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageDimension2D`

* 
`maxExtent.height` ≥
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageDimension2D`

* 
`maxExtent.depth` = 1

For [VK_IMAGE_TYPE_2D](resources.html#VkImageType) when `flags` contains
[VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits):

* 
`maxExtent.width` ≥
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageDimensionCube`

* 
`maxExtent.height` ≥
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageDimensionCube`

* 
`maxExtent.depth` = 1

For [VK_IMAGE_TYPE_3D](resources.html#VkImageType):

* 
`maxExtent.width` ≥
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageDimension3D`

* 
`maxExtent.height` ≥
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageDimension3D`

* 
`maxExtent.depth` ≥
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageDimension3D`

To query the external handle types supported by buffers, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceExternalBufferProperties(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalBufferInfo*   pExternalBufferInfo,
    VkExternalBufferProperties*                 pExternalBufferProperties);

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to vkGetPhysicalDeviceExternalBufferProperties
void vkGetPhysicalDeviceExternalBufferPropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalBufferInfo*   pExternalBufferInfo,
    VkExternalBufferProperties*                 pExternalBufferProperties);

* 
`physicalDevice` is the physical device from which to query the
buffer capabilities.

* 
`pExternalBufferInfo` is a pointer to a
[VkPhysicalDeviceExternalBufferInfo](#VkPhysicalDeviceExternalBufferInfo) structure describing the
parameters that would be consumed by [vkCreateBuffer](resources.html#vkCreateBuffer).

* 
`pExternalBufferProperties` is a pointer to a
[VkExternalBufferProperties](#VkExternalBufferProperties) structure in which capabilities are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceExternalBufferProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceExternalBufferProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceExternalBufferProperties-pExternalBufferInfo-parameter) VUID-vkGetPhysicalDeviceExternalBufferProperties-pExternalBufferInfo-parameter

 `pExternalBufferInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceExternalBufferInfo](#VkPhysicalDeviceExternalBufferInfo) structure

* 
[](#VUID-vkGetPhysicalDeviceExternalBufferProperties-pExternalBufferProperties-parameter) VUID-vkGetPhysicalDeviceExternalBufferProperties-pExternalBufferProperties-parameter

 `pExternalBufferProperties` **must** be a valid pointer to a [VkExternalBufferProperties](#VkExternalBufferProperties) structure

The `VkPhysicalDeviceExternalBufferInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceExternalBufferInfo {
    VkStructureType                       sType;
    const void*                           pNext;
    VkBufferCreateFlags                   flags;
    VkBufferUsageFlags                    usage;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkPhysicalDeviceExternalBufferInfo;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkPhysicalDeviceExternalBufferInfo
typedef VkPhysicalDeviceExternalBufferInfo VkPhysicalDeviceExternalBufferInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkBufferCreateFlagBits](resources.html#VkBufferCreateFlagBits) describing
additional parameters of the buffer, corresponding to
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`flags`.

* 
`usage` is a bitmask of [VkBufferUsageFlagBits](resources.html#VkBufferUsageFlagBits) describing the
intended usage of the buffer, corresponding to
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`usage`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](#VkExternalMemoryHandleTypeFlagBits) value
specifying the memory handle type that will be used with the memory
associated with the buffer.

Only usage flags representable in [VkBufferUsageFlagBits](resources.html#VkBufferUsageFlagBits) are returned
in this structure’s `usage`.
If the `pNext` chain includes a [VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo)
structure, all usage flags of the buffer are returned in
[VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo)::`usage`.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-None-09499) VUID-VkPhysicalDeviceExternalBufferInfo-None-09499

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo) structure,
`usage` **must** be a valid combination of [VkBufferUsageFlagBits](resources.html#VkBufferUsageFlagBits)
values

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-None-09500) VUID-VkPhysicalDeviceExternalBufferInfo-None-09500

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo) structure,
`usage` **must** not be 0

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-sType-sType) VUID-VkPhysicalDeviceExternalBufferInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_BUFFER_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-pNext-pNext) VUID-VkPhysicalDeviceExternalBufferInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo)

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-sType-unique) VUID-VkPhysicalDeviceExternalBufferInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-flags-parameter) VUID-VkPhysicalDeviceExternalBufferInfo-flags-parameter

 `flags` **must** be a valid combination of [VkBufferCreateFlagBits](resources.html#VkBufferCreateFlagBits) values

* 
[](#VUID-VkPhysicalDeviceExternalBufferInfo-handleType-parameter) VUID-VkPhysicalDeviceExternalBufferInfo-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](#VkExternalMemoryHandleTypeFlagBits) value

The `VkExternalBufferProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalBufferProperties {
    VkStructureType               sType;
    void*                         pNext;
    VkExternalMemoryProperties    externalMemoryProperties;
} VkExternalBufferProperties;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkExternalBufferProperties
typedef VkExternalBufferProperties VkExternalBufferPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalMemoryProperties` is a [VkExternalMemoryProperties](#VkExternalMemoryProperties)
structure specifying various capabilities of the external handle type
when used with the specified buffer creation parameters.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalBufferProperties-sType-sType) VUID-VkExternalBufferProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_BUFFER_PROPERTIES](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExternalBufferProperties-pNext-pNext) VUID-VkExternalBufferProperties-pNext-pNext

 `pNext` **must** be `NULL`

To query the external handle types supported by tensors, call:

// Provided by VK_ARM_tensors
void vkGetPhysicalDeviceExternalTensorPropertiesARM(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalTensorInfoARM* pExternalTensorInfo,
    VkExternalTensorPropertiesARM*              pExternalTensorProperties);

* 
`physicalDevice` is the physical device from which to query the
tensor capabilities.

* 
`pExternalTensorInfo` is a pointer to a
[VkPhysicalDeviceExternalTensorInfoARM](#VkPhysicalDeviceExternalTensorInfoARM) structure describing the
parameters that would be consumed by [vkCreateTensorARM](resources.html#vkCreateTensorARM).

* 
`pExternalTensorProperties` is a pointer to a
[VkExternalTensorPropertiesARM](#VkExternalTensorPropertiesARM) structure in which the capabilities
are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-physicalDevice-parameter) VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-pExternalTensorInfo-parameter) VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-pExternalTensorInfo-parameter

 `pExternalTensorInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceExternalTensorInfoARM](#VkPhysicalDeviceExternalTensorInfoARM) structure

* 
[](#VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-pExternalTensorProperties-parameter) VUID-vkGetPhysicalDeviceExternalTensorPropertiesARM-pExternalTensorProperties-parameter

 `pExternalTensorProperties` **must** be a valid pointer to a [VkExternalTensorPropertiesARM](#VkExternalTensorPropertiesARM) structure

The `VkPhysicalDeviceExternalTensorInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkPhysicalDeviceExternalTensorInfoARM {
    VkStructureType                       sType;
    const void*                           pNext;
    VkTensorCreateFlagsARM                flags;
    const VkTensorDescriptionARM*         pDescription;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkPhysicalDeviceExternalTensorInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkTensorCreateFlagBitsARM](resources.html#VkTensorCreateFlagBitsARM) describing
additional parameters of the tensor, corresponding to
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`flags`.

* 
`pDescription` is a [VkTensorDescriptionARM](resources.html#VkTensorDescriptionARM) structure
describing the tensor, corresponding to
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`pDescription`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](#VkExternalMemoryHandleTypeFlagBits) value
specifying the external memory handle type for which capabilities will
be returned.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalTensorInfoARM-sType-sType) VUID-VkPhysicalDeviceExternalTensorInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_TENSOR_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceExternalTensorInfoARM-pNext-pNext) VUID-VkPhysicalDeviceExternalTensorInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPhysicalDeviceExternalTensorInfoARM-flags-parameter) VUID-VkPhysicalDeviceExternalTensorInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkTensorCreateFlagBitsARM](resources.html#VkTensorCreateFlagBitsARM) values

* 
[](#VUID-VkPhysicalDeviceExternalTensorInfoARM-pDescription-parameter) VUID-VkPhysicalDeviceExternalTensorInfoARM-pDescription-parameter

 `pDescription` **must** be a valid pointer to a valid [VkTensorDescriptionARM](resources.html#VkTensorDescriptionARM) structure

* 
[](#VUID-VkPhysicalDeviceExternalTensorInfoARM-handleType-parameter) VUID-VkPhysicalDeviceExternalTensorInfoARM-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](#VkExternalMemoryHandleTypeFlagBits) value

The `VkExternalTensorPropertiesARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkExternalTensorPropertiesARM {
    VkStructureType               sType;
    const void*                   pNext;
    VkExternalMemoryProperties    externalMemoryProperties;
} VkExternalTensorPropertiesARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalMemoryProperties` is a [VkExternalMemoryProperties](#VkExternalMemoryProperties)
structure specifying various capabilities of the external handle type
when used with the specified tensor creation parameters.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalTensorPropertiesARM-sType-sType) VUID-VkExternalTensorPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_TENSOR_PROPERTIES_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExternalTensorPropertiesARM-pNext-pNext) VUID-VkExternalTensorPropertiesARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkExternalTensorPropertiesARM-externalMemoryProperties-parameter) VUID-VkExternalTensorPropertiesARM-externalMemoryProperties-parameter

 `externalMemoryProperties` **must** be a valid [VkExternalMemoryProperties](#VkExternalMemoryProperties) structure

Semaphores **may** support import and export of their
[payload](synchronization.html#synchronization-semaphores-payloads) to external handles.
To query the external handle types supported by semaphores, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceExternalSemaphoreProperties(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalSemaphoreInfo* pExternalSemaphoreInfo,
    VkExternalSemaphoreProperties*              pExternalSemaphoreProperties);

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to vkGetPhysicalDeviceExternalSemaphoreProperties
void vkGetPhysicalDeviceExternalSemaphorePropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalSemaphoreInfo* pExternalSemaphoreInfo,
    VkExternalSemaphoreProperties*              pExternalSemaphoreProperties);

* 
`physicalDevice` is the physical device from which to query the
semaphore capabilities.

* 
`pExternalSemaphoreInfo` is a pointer to a
[VkPhysicalDeviceExternalSemaphoreInfo](#VkPhysicalDeviceExternalSemaphoreInfo) structure describing the
parameters that would be consumed by [vkCreateSemaphore](synchronization.html#vkCreateSemaphore).

* 
`pExternalSemaphoreProperties` is a pointer to a
[VkExternalSemaphoreProperties](#VkExternalSemaphoreProperties) structure in which capabilities are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-pExternalSemaphoreInfo-parameter) VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-pExternalSemaphoreInfo-parameter

 `pExternalSemaphoreInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceExternalSemaphoreInfo](#VkPhysicalDeviceExternalSemaphoreInfo) structure

* 
[](#VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-pExternalSemaphoreProperties-parameter) VUID-vkGetPhysicalDeviceExternalSemaphoreProperties-pExternalSemaphoreProperties-parameter

 `pExternalSemaphoreProperties` **must** be a valid pointer to a [VkExternalSemaphoreProperties](#VkExternalSemaphoreProperties) structure

The `VkPhysicalDeviceExternalSemaphoreInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceExternalSemaphoreInfo {
    VkStructureType                          sType;
    const void*                              pNext;
    VkExternalSemaphoreHandleTypeFlagBits    handleType;
} VkPhysicalDeviceExternalSemaphoreInfo;

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to VkPhysicalDeviceExternalSemaphoreInfo
typedef VkPhysicalDeviceExternalSemaphoreInfo VkPhysicalDeviceExternalSemaphoreInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalSemaphoreHandleTypeFlagBits](#VkExternalSemaphoreHandleTypeFlagBits) value
specifying the external semaphore handle type for which capabilities
will be returned.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalSemaphoreInfo-sType-sType) VUID-VkPhysicalDeviceExternalSemaphoreInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_SEMAPHORE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceExternalSemaphoreInfo-pNext-pNext) VUID-VkPhysicalDeviceExternalSemaphoreInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkSemaphoreTypeCreateInfo](synchronization.html#VkSemaphoreTypeCreateInfo)

* 
[](#VUID-VkPhysicalDeviceExternalSemaphoreInfo-sType-unique) VUID-VkPhysicalDeviceExternalSemaphoreInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPhysicalDeviceExternalSemaphoreInfo-handleType-parameter) VUID-VkPhysicalDeviceExternalSemaphoreInfo-handleType-parameter

 `handleType` **must** be a valid [VkExternalSemaphoreHandleTypeFlagBits](#VkExternalSemaphoreHandleTypeFlagBits) value

Bits which **may** be set in
[VkPhysicalDeviceExternalSemaphoreInfo](#VkPhysicalDeviceExternalSemaphoreInfo)::`handleType`, specifying an
external semaphore handle type, are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalSemaphoreHandleTypeFlagBits {
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT = 0x00000001,
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT = 0x00000002,
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT = 0x00000004,
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT = 0x00000008,
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT = 0x00000010,
  // Provided by VK_FUCHSIA_external_semaphore
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_ZIRCON_EVENT_BIT_FUCHSIA = 0x00000080,
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D11_FENCE_BIT = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT_KHR = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT_KHR = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_KHR = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT_KHR = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT_KHR = VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT,
} VkExternalSemaphoreHandleTypeFlagBits;

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to VkExternalSemaphoreHandleTypeFlagBits
typedef VkExternalSemaphoreHandleTypeFlagBits VkExternalSemaphoreHandleTypeFlagBitsKHR;

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) specifies a POSIX
file descriptor handle that has only limited valid usage outside of
Vulkan and other compatible APIs.
It **must** be compatible with the POSIX system calls `dup`, `dup2`,
`close`, and the non-standard system call `dup3`.
Additionally, it **must** be transportable over a socket using an
`SCM_RIGHTS` control message.
It owns a reference to the underlying synchronization primitive
represented by its Vulkan semaphore object.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) specifies an NT
handle that has only limited valid usage outside of Vulkan and other
compatible APIs.
It **must** be compatible with the functions `DuplicateHandle`,
`CloseHandle`, `CompareObjectHandles`, `GetHandleInformation`,
and `SetHandleInformation`.
It owns a reference to the underlying synchronization primitive
represented by its Vulkan semaphore object.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) specifies a
global share handle that has only limited valid usage outside of Vulkan
and other compatible APIs.
It is not compatible with any native APIs.
It does not own a reference to the underlying synchronization primitive
represented by its Vulkan semaphore object, and will therefore become
invalid when all Vulkan semaphore objects associated with it are
destroyed.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) specifies an NT
handle returned by `ID3D12Device`::`CreateSharedHandle` referring
to a Direct3D 12 fence, or `ID3D11Device5`::`CreateFence`
referring to a Direct3D 11 fence.
It owns a reference to the underlying synchronization primitive
associated with the Direct3D fence.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D11_FENCE_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) is an alias of
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) with the same
meaning.
It is provided for convenience and code clarity when interacting with
D3D11 fences.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) specifies a POSIX
file descriptor handle to a Linux Sync File or Android Fence object.
It can be used with any native API accepting a valid sync file or fence
as input.
It owns a reference to the underlying synchronization primitive
associated with the file descriptor.
Implementations which support importing this handle type **must** accept
any type of sync or fence FD supported by the native system they are
running on.

* 
[VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_ZIRCON_EVENT_BIT_FUCHSIA](#VkExternalSemaphoreHandleTypeFlagBitsKHR)
specifies a handle to a Zircon event object.
It can be used with any native API that accepts a Zircon event handle.
Zircon event handles are created with `ZX_RIGHTS_BASIC` and
`ZX_RIGHTS_SIGNAL` rights.
Vulkan on Fuchsia uses only the ZX_EVENT_SIGNALED bit when signaling or
waiting.

|  | Handles of type [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR)
| --- | --- |
generated by the implementation may represent either Linux Sync Files or
Android Fences at the implementation’s discretion.
Applications **should** only use operations defined for both types of file
descriptors, unless they know via means external to Vulkan the type of the
file descriptor, or are prepared to deal with the system-defined operation
failures resulting from using the wrong type. |

Some external semaphore handle types can only be shared within the same
underlying physical device and/or the same driver version, as defined in the
following table:

| Handle type | `VkPhysicalDeviceIDProperties`::`driverUUID` | `VkPhysicalDeviceIDProperties`::`deviceUUID` |
| --- | --- | --- |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_FD_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_D3D12_FENCE_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_SYNC_FD_BIT](#VkExternalSemaphoreHandleTypeFlagBitsKHR) | No restriction | No restriction |
| [VK_EXTERNAL_SEMAPHORE_HANDLE_TYPE_ZIRCON_EVENT_BIT_FUCHSIA](#VkExternalSemaphoreHandleTypeFlagBitsKHR) | No restriction | No restriction |

// Provided by VK_VERSION_1_1
typedef VkFlags VkExternalSemaphoreHandleTypeFlags;

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to VkExternalSemaphoreHandleTypeFlags
typedef VkExternalSemaphoreHandleTypeFlags VkExternalSemaphoreHandleTypeFlagsKHR;

`VkExternalSemaphoreHandleTypeFlags` is a bitmask type for setting a
mask of zero or more [VkExternalSemaphoreHandleTypeFlagBits](#VkExternalSemaphoreHandleTypeFlagBits).

The `VkExternalSemaphoreProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalSemaphoreProperties {
    VkStructureType                       sType;
    void*                                 pNext;
    VkExternalSemaphoreHandleTypeFlags    exportFromImportedHandleTypes;
    VkExternalSemaphoreHandleTypeFlags    compatibleHandleTypes;
    VkExternalSemaphoreFeatureFlags       externalSemaphoreFeatures;
} VkExternalSemaphoreProperties;

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to VkExternalSemaphoreProperties
typedef VkExternalSemaphoreProperties VkExternalSemaphorePropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`exportFromImportedHandleTypes` is a bitmask of
[VkExternalSemaphoreHandleTypeFlagBits](#VkExternalSemaphoreHandleTypeFlagBits) specifying which types of
imported handle `handleType` **can** be exported from.

* 
`compatibleHandleTypes` is a bitmask of
[VkExternalSemaphoreHandleTypeFlagBits](#VkExternalSemaphoreHandleTypeFlagBits) specifying handle types
which **can** be specified at the same time as `handleType` when
creating a semaphore.

* 
`externalSemaphoreFeatures` is a bitmask of
[VkExternalSemaphoreFeatureFlagBits](#VkExternalSemaphoreFeatureFlagBits) describing the features of
`handleType`.

If `handleType` is not supported by the implementation, then
[VkExternalSemaphoreProperties](#VkExternalSemaphoreProperties)::`externalSemaphoreFeatures` will be
zero.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalSemaphoreProperties-sType-sType) VUID-VkExternalSemaphoreProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_SEMAPHORE_PROPERTIES](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExternalSemaphoreProperties-pNext-pNext) VUID-VkExternalSemaphoreProperties-pNext-pNext

 `pNext` **must** be `NULL`

Bits which **may** be set in
[VkExternalSemaphoreProperties](#VkExternalSemaphoreProperties)::`externalSemaphoreFeatures`,
specifying the features of an external semaphore handle type, are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalSemaphoreFeatureFlagBits {
    VK_EXTERNAL_SEMAPHORE_FEATURE_EXPORTABLE_BIT = 0x00000001,
    VK_EXTERNAL_SEMAPHORE_FEATURE_IMPORTABLE_BIT = 0x00000002,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_FEATURE_EXPORTABLE_BIT_KHR = VK_EXTERNAL_SEMAPHORE_FEATURE_EXPORTABLE_BIT,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_EXTERNAL_SEMAPHORE_FEATURE_IMPORTABLE_BIT_KHR = VK_EXTERNAL_SEMAPHORE_FEATURE_IMPORTABLE_BIT,
} VkExternalSemaphoreFeatureFlagBits;

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to VkExternalSemaphoreFeatureFlagBits
typedef VkExternalSemaphoreFeatureFlagBits VkExternalSemaphoreFeatureFlagBitsKHR;

* 
[VK_EXTERNAL_SEMAPHORE_FEATURE_EXPORTABLE_BIT](#VkExternalSemaphoreFeatureFlagBitsKHR) specifies that
handles of this type **can** be exported from Vulkan semaphore objects.

* 
[VK_EXTERNAL_SEMAPHORE_FEATURE_IMPORTABLE_BIT](#VkExternalSemaphoreFeatureFlagBitsKHR) specifies that
handles of this type **can** be imported as Vulkan semaphore objects.

// Provided by VK_VERSION_1_1
typedef VkFlags VkExternalSemaphoreFeatureFlags;

// Provided by VK_KHR_external_semaphore_capabilities
// Equivalent to VkExternalSemaphoreFeatureFlags
typedef VkExternalSemaphoreFeatureFlags VkExternalSemaphoreFeatureFlagsKHR;

`VkExternalSemaphoreFeatureFlags` is a bitmask type for setting a mask
of zero or more [VkExternalSemaphoreFeatureFlagBits](#VkExternalSemaphoreFeatureFlagBits).

Fences **may** support import and export of their
[payload](synchronization.html#synchronization-fences-payloads) to external handles.
To query the external handle types supported by fences, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceExternalFenceProperties(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalFenceInfo*    pExternalFenceInfo,
    VkExternalFenceProperties*                  pExternalFenceProperties);

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to vkGetPhysicalDeviceExternalFenceProperties
void vkGetPhysicalDeviceExternalFencePropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceExternalFenceInfo*    pExternalFenceInfo,
    VkExternalFenceProperties*                  pExternalFenceProperties);

* 
`physicalDevice` is the physical device from which to query the
fence capabilities.

* 
`pExternalFenceInfo` is a pointer to a
[VkPhysicalDeviceExternalFenceInfo](#VkPhysicalDeviceExternalFenceInfo) structure describing the
parameters that would be consumed by [vkCreateFence](synchronization.html#vkCreateFence).

* 
`pExternalFenceProperties` is a pointer to a
[VkExternalFenceProperties](#VkExternalFenceProperties) structure in which capabilities are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceExternalFenceProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceExternalFenceProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceExternalFenceProperties-pExternalFenceInfo-parameter) VUID-vkGetPhysicalDeviceExternalFenceProperties-pExternalFenceInfo-parameter

 `pExternalFenceInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceExternalFenceInfo](#VkPhysicalDeviceExternalFenceInfo) structure

* 
[](#VUID-vkGetPhysicalDeviceExternalFenceProperties-pExternalFenceProperties-parameter) VUID-vkGetPhysicalDeviceExternalFenceProperties-pExternalFenceProperties-parameter

 `pExternalFenceProperties` **must** be a valid pointer to a [VkExternalFenceProperties](#VkExternalFenceProperties) structure

The `VkPhysicalDeviceExternalFenceInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceExternalFenceInfo {
    VkStructureType                      sType;
    const void*                          pNext;
    VkExternalFenceHandleTypeFlagBits    handleType;
} VkPhysicalDeviceExternalFenceInfo;

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to VkPhysicalDeviceExternalFenceInfo
typedef VkPhysicalDeviceExternalFenceInfo VkPhysicalDeviceExternalFenceInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalFenceHandleTypeFlagBits](#VkExternalFenceHandleTypeFlagBits) value
specifying an external fence handle type for which capabilities will be
returned.

|  | Handles of type [VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](#VkExternalFenceHandleTypeFlagBitsKHR) generated by
| --- | --- |
the implementation may represent either Linux Sync Files or Android Fences
at the implementation’s discretion.
Applications **should** only use operations defined for both types of file
descriptors, unless they know via means external to Vulkan the type of the
file descriptor, or are prepared to deal with the system-defined operation
failures resulting from using the wrong type. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalFenceInfo-sType-sType) VUID-VkPhysicalDeviceExternalFenceInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FENCE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceExternalFenceInfo-pNext-pNext) VUID-VkPhysicalDeviceExternalFenceInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPhysicalDeviceExternalFenceInfo-handleType-parameter) VUID-VkPhysicalDeviceExternalFenceInfo-handleType-parameter

 `handleType` **must** be a valid [VkExternalFenceHandleTypeFlagBits](#VkExternalFenceHandleTypeFlagBits) value

Bits which **may** be set in

* 
[VkPhysicalDeviceExternalFenceInfo](#VkPhysicalDeviceExternalFenceInfo)::`handleType`

* 
[VkExternalFenceProperties](#VkExternalFenceProperties)::`exportFromImportedHandleTypes`

* 
[VkExternalFenceProperties](#VkExternalFenceProperties)::`compatibleHandleTypes`

indicate external fence handle types, and are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalFenceHandleTypeFlagBits {
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT = 0x00000001,
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT = 0x00000002,
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT = 0x00000004,
    VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT = 0x00000008,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT_KHR = VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT_KHR = VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_KHR = VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT_KHR = VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT,
} VkExternalFenceHandleTypeFlagBits;

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to VkExternalFenceHandleTypeFlagBits
typedef VkExternalFenceHandleTypeFlagBits VkExternalFenceHandleTypeFlagBitsKHR;

* 
[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT](#VkExternalFenceHandleTypeFlagBitsKHR) specifies a POSIX file
descriptor handle that has only limited valid usage outside of Vulkan
and other compatible APIs.
It **must** be compatible with the POSIX system calls `dup`, `dup2`,
`close`, and the non-standard system call `dup3`.
Additionally, it **must** be transportable over a socket using an
`SCM_RIGHTS` control message.
It owns a reference to the underlying synchronization primitive
represented by its Vulkan fence object.

* 
[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT](#VkExternalFenceHandleTypeFlagBitsKHR) specifies an NT
handle that has only limited valid usage outside of Vulkan and other
compatible APIs.
It **must** be compatible with the functions `DuplicateHandle`,
`CloseHandle`, `CompareObjectHandles`, `GetHandleInformation`,
and `SetHandleInformation`.
It owns a reference to the underlying synchronization primitive
represented by its Vulkan fence object.

* 
[VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#VkExternalFenceHandleTypeFlagBitsKHR) specifies a
global share handle that has only limited valid usage outside of Vulkan
and other compatible APIs.
It is not compatible with any native APIs.
It does not own a reference to the underlying synchronization primitive
represented by its Vulkan fence object, and will therefore become
invalid when all Vulkan fence objects associated with it are destroyed.

* 
[VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](#VkExternalFenceHandleTypeFlagBitsKHR) specifies a POSIX file
descriptor handle to a Linux Sync File or Android Fence.
It can be used with any native API accepting a valid sync file or fence
as input.
It owns a reference to the underlying synchronization primitive
associated with the file descriptor.
Implementations which support importing this handle type **must** accept
any type of sync or fence FD supported by the native system they are
running on.

Some external fence handle types can only be shared within the same
underlying physical device and/or the same driver version, as defined in the
following table:

| Handle type | `VkPhysicalDeviceIDProperties`::`driverUUID` | `VkPhysicalDeviceIDProperties`::`deviceUUID` |
| --- | --- | --- |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_FD_BIT](#VkExternalFenceHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_BIT](#VkExternalFenceHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](#VkExternalFenceHandleTypeFlagBitsKHR) | Must match | Must match |
| [VK_EXTERNAL_FENCE_HANDLE_TYPE_SYNC_FD_BIT](#VkExternalFenceHandleTypeFlagBitsKHR) | No restriction | No restriction |

// Provided by VK_VERSION_1_1
typedef VkFlags VkExternalFenceHandleTypeFlags;

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to VkExternalFenceHandleTypeFlags
typedef VkExternalFenceHandleTypeFlags VkExternalFenceHandleTypeFlagsKHR;

`VkExternalFenceHandleTypeFlags` is a bitmask type for setting a mask of
zero or more [VkExternalFenceHandleTypeFlagBits](#VkExternalFenceHandleTypeFlagBits).

The `VkExternalFenceProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalFenceProperties {
    VkStructureType                   sType;
    void*                             pNext;
    VkExternalFenceHandleTypeFlags    exportFromImportedHandleTypes;
    VkExternalFenceHandleTypeFlags    compatibleHandleTypes;
    VkExternalFenceFeatureFlags       externalFenceFeatures;
} VkExternalFenceProperties;

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to VkExternalFenceProperties
typedef VkExternalFenceProperties VkExternalFencePropertiesKHR;

* 
`exportFromImportedHandleTypes` is a bitmask of
[VkExternalFenceHandleTypeFlagBits](#VkExternalFenceHandleTypeFlagBits) indicating which types of
imported handle `handleType` **can** be exported from.

* 
`compatibleHandleTypes` is a bitmask of
[VkExternalFenceHandleTypeFlagBits](#VkExternalFenceHandleTypeFlagBits) specifying handle types which
**can** be specified at the same time as `handleType` when creating a
fence.

* 
`externalFenceFeatures` is a bitmask of
[VkExternalFenceFeatureFlagBits](#VkExternalFenceFeatureFlagBits) indicating the features of
`handleType`.

If `handleType` is not supported by the implementation, then
[VkExternalFenceProperties](#VkExternalFenceProperties)::`externalFenceFeatures` will be zero.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalFenceProperties-sType-sType) VUID-VkExternalFenceProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_FENCE_PROPERTIES](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExternalFenceProperties-pNext-pNext) VUID-VkExternalFenceProperties-pNext-pNext

 `pNext` **must** be `NULL`

Bits which **may** be set in
[VkExternalFenceProperties](#VkExternalFenceProperties)::`externalFenceFeatures`, indicating
features of a fence external handle type, are:

// Provided by VK_VERSION_1_1
typedef enum VkExternalFenceFeatureFlagBits {
    VK_EXTERNAL_FENCE_FEATURE_EXPORTABLE_BIT = 0x00000001,
    VK_EXTERNAL_FENCE_FEATURE_IMPORTABLE_BIT = 0x00000002,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_FEATURE_EXPORTABLE_BIT_KHR = VK_EXTERNAL_FENCE_FEATURE_EXPORTABLE_BIT,
  // Provided by VK_KHR_external_fence_capabilities
    VK_EXTERNAL_FENCE_FEATURE_IMPORTABLE_BIT_KHR = VK_EXTERNAL_FENCE_FEATURE_IMPORTABLE_BIT,
} VkExternalFenceFeatureFlagBits;

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to VkExternalFenceFeatureFlagBits
typedef VkExternalFenceFeatureFlagBits VkExternalFenceFeatureFlagBitsKHR;

* 
[VK_EXTERNAL_FENCE_FEATURE_EXPORTABLE_BIT](#VkExternalFenceFeatureFlagBitsKHR) specifies handles of this
type **can** be exported from Vulkan fence objects.

* 
[VK_EXTERNAL_FENCE_FEATURE_IMPORTABLE_BIT](#VkExternalFenceFeatureFlagBitsKHR) specifies handles of this
type **can** be imported to Vulkan fence objects.

// Provided by VK_VERSION_1_1
typedef VkFlags VkExternalFenceFeatureFlags;

// Provided by VK_KHR_external_fence_capabilities
// Equivalent to VkExternalFenceFeatureFlags
typedef VkExternalFenceFeatureFlags VkExternalFenceFeatureFlagsKHR;

`VkExternalFenceFeatureFlags` is a bitmask type for setting a mask of
zero or more [VkExternalFenceFeatureFlagBits](#VkExternalFenceFeatureFlagBits).

To query the set of time domains for which a physical device supports
timestamp calibration, call:

// Provided by VK_KHR_calibrated_timestamps
VkResult vkGetPhysicalDeviceCalibrateableTimeDomainsKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pTimeDomainCount,
    VkTimeDomainKHR*                            pTimeDomains);

// Provided by VK_EXT_calibrated_timestamps
// Equivalent to vkGetPhysicalDeviceCalibrateableTimeDomainsKHR
VkResult vkGetPhysicalDeviceCalibrateableTimeDomainsEXT(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pTimeDomainCount,
    VkTimeDomainKHR*                            pTimeDomains);

* 
`physicalDevice` is the physical device from which to query the set
of calibrateable time domains.

* 
`pTimeDomainCount` is a pointer to an integer related to the number
of calibrateable time domains available or queried, as described below.

* 
`pTimeDomains` is either `NULL` or a pointer to an array of
[VkTimeDomainKHR](synchronization.html#VkTimeDomainKHR) values, indicating the supported calibrateable
time domains.

If `pTimeDomains` is `NULL`, then the number of calibrateable time
domains supported for the given `physicalDevice` is returned in
`pTimeDomainCount`.
Otherwise, `pTimeDomainCount` **must** point to a variable set by the
application to the number of elements in the `pTimeDomains` array, and
on return the variable is overwritten with the number of values actually
written to `pTimeDomains`.
If the value of `pTimeDomainCount` is less than the number of
calibrateable time domains supported, at most `pTimeDomainCount` values
will be written to `pTimeDomains`, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be
returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available
time domains were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-pTimeDomainCount-parameter) VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-pTimeDomainCount-parameter

 `pTimeDomainCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-pTimeDomains-parameter) VUID-vkGetPhysicalDeviceCalibrateableTimeDomainsKHR-pTimeDomains-parameter

 If the value referenced by `pTimeDomainCount` is not `0`, and `pTimeDomains` is not `NULL`, `pTimeDomains` **must** be a valid pointer to an array of `pTimeDomainCount` [VkTimeDomainKHR](synchronization.html#VkTimeDomainKHR) values

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)
