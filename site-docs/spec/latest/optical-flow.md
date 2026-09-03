# Optical Flow

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/VK_NV_optical_flow/optical_flow.html

## Table of Contents

- [Optical Flow Queues](#_optical_flow_queues)
- [Optical_Flow_Queues](#_optical_flow_queues)
- [Optical Flow Image Formats](#opticalflow-formats)
- [Optical_Flow_Image_Formats](#opticalflow-formats)
- [Optical Flow Session](#opticalflow-session)
- [Optical_Flow_Session](#opticalflow-session)
- [Optical Flow Session Object](#opticalflow-session-object)
- [Optical_Flow_Session_Object](#opticalflow-session-object)
- [Creating an Optical Flow Session](#opticalflow-session-creation)
- [Creating_an_Optical_Flow_Session](#opticalflow-session-creation)
- [Destroying an Optical Flow Session](#opticalflow-session-destruction)
- [Destroying_an_Optical_Flow_Session](#opticalflow-session-destruction)
- [Binding Vulkan Image Views to an Optical Flow Session](#opticalflow-session-binding-images)
- [Binding_Vulkan_Image_Views_to_an_Optical_Flow_Session](#opticalflow-session-binding-images)
- [Optical Flow Execution](#opticalflow-operations)
- [Optical_Flow_Execution](#opticalflow-operations)

## Content

`[VK_NV_optical_flow](../../appendices/extensions.html#VK_NV_optical_flow)` adds an optical flow queue type bit
[VK_QUEUE_OPTICAL_FLOW_BIT_NV](../devsandqueues.html#VkQueueFlagBits) to [VkQueueFlagBits](../devsandqueues.html#VkQueueFlagBits).
Optical flow operations are supported by queues with an advertised queue
capability of [VK_QUEUE_OPTICAL_FLOW_BIT_NV](../devsandqueues.html#VkQueueFlagBits).
As in the case of other queue types, an application **must** use
[vkGetPhysicalDeviceQueueFamilyProperties](../devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties) to query whether the physical
device has support for the Optical Flow Queue.
When the implementation reports the [VK_QUEUE_OPTICAL_FLOW_BIT_NV](../devsandqueues.html#VkQueueFlagBits) bit
for a queue family, it advertises general support for Vulkan queue
operations described in [Devices and Queues](../devsandqueues.html#devsandqueues).

To enumerate the supported image formats for a specific optical flow usage,
call:

// Provided by VK_NV_optical_flow
VkResult vkGetPhysicalDeviceOpticalFlowImageFormatsNV(
    VkPhysicalDevice                            physicalDevice,
    const VkOpticalFlowImageFormatInfoNV*       pOpticalFlowImageFormatInfo,
    uint32_t*                                   pFormatCount,
    VkOpticalFlowImageFormatPropertiesNV*       pImageFormatProperties);

* 
`physicalDevice` is the physical device being queried.

* 

`pOpticalFlowImageFormatInfo` is a pointer to a
[VkOpticalFlowImageFormatInfoNV](#VkOpticalFlowImageFormatInfoNV) structure specifying the optical
flow usage for which information is returned.

* 
 `pFormatCount` is a
pointer to an integer related to the number of optical flow properties
available or queried, as described below.

* 

`pImageFormatProperties` is a pointer to an array of
[VkOpticalFlowImageFormatPropertiesNV](#VkOpticalFlowImageFormatPropertiesNV) structures in which supported
formats and image parameters are returned.

If `pImageFormatProperties` is `NULL`, then the number of optical flow
properties supported for the given `physicalDevice` is returned in
`pFormatCount`.
Otherwise, `pFormatCount` **must** point to a variable set by the
application to the number of elements in the `pImageFormatProperties`
array, and on return the variable is overwritten with the number of values
actually written to `pImageFormatProperties`.
If the value of `pFormatCount` is less than the number of optical flow
properties supported, at most `pFormatCount` values will be written to
`pImageFormatProperties`, and [VK_INCOMPLETE](../fundamentals.html#VkResult) will be returned
instead of [VK_SUCCESS](../fundamentals.html#VkResult), to indicate that not all the available values
were returned.

Before creating an image to be used as an optical flow frame, obtain the
supported image creation parameters by querying with
[vkGetPhysicalDeviceFormatProperties2](../formats.html#vkGetPhysicalDeviceFormatProperties2) and
[vkGetPhysicalDeviceImageFormatProperties2](../capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) using one of the reported
formats and adding [VkOpticalFlowImageFormatInfoNV](#VkOpticalFlowImageFormatInfoNV) to the `pNext`
chain of [VkPhysicalDeviceImageFormatInfo2](../capabilities.html#VkPhysicalDeviceImageFormatInfo2).

When querying the parameters with
[vkGetPhysicalDeviceImageFormatProperties2](../capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) for images used for optical
flow operations, the [VkOpticalFlowImageFormatInfoNV](#VkOpticalFlowImageFormatInfoNV)::`usage` field
**must** contain one or more of the bits defined in
[VkOpticalFlowUsageFlagBitsNV](#VkOpticalFlowUsageFlagBitsNV).

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-physicalDevice-parameter) VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](../devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pOpticalFlowImageFormatInfo-parameter) VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pOpticalFlowImageFormatInfo-parameter

 `pOpticalFlowImageFormatInfo` **must** be a valid pointer to a valid [VkOpticalFlowImageFormatInfoNV](#VkOpticalFlowImageFormatInfoNV) structure

* 
[](#VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pFormatCount-parameter) VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pFormatCount-parameter

 `pFormatCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pImageFormatProperties-parameter) VUID-vkGetPhysicalDeviceOpticalFlowImageFormatsNV-pImageFormatProperties-parameter

 If the value referenced by `pFormatCount` is not `0`, and `pImageFormatProperties` is not `NULL`, `pImageFormatProperties` **must** be a valid pointer to an array of `pFormatCount` [VkOpticalFlowImageFormatPropertiesNV](#VkOpticalFlowImageFormatPropertiesNV) structures

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_EXTENSION_NOT_PRESENT](../fundamentals.html#VkResult)

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](../fundamentals.html#VkResult)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

|  | [VK_FORMAT_B8G8R8A8_UNORM](../formats.html#VkFormat), [VK_FORMAT_R8_UNORM](../formats.html#VkFormat) and
| --- | --- |
[VK_FORMAT_G8_B8R8_2PLANE_420_UNORM](../formats.html#VkFormat) are initially supported for images
with [optical usage](#opticalflow-usage)
[VK_OPTICAL_FLOW_USAGE_INPUT_BIT_NV](#VkOpticalFlowUsageFlagBitsNV).

[VK_FORMAT_R16G16_SFIXED5_NV](../formats.html#VkFormat) is initially supported for images with
[optical flow usage](#opticalflow-usage)
[VK_OPTICAL_FLOW_USAGE_OUTPUT_BIT_NV](#VkOpticalFlowUsageFlagBitsNV),
[VK_OPTICAL_FLOW_USAGE_HINT_BIT_NV](#VkOpticalFlowUsageFlagBitsNV) and
[VK_OPTICAL_FLOW_USAGE_GLOBAL_FLOW_BIT_NV](#VkOpticalFlowUsageFlagBitsNV).

[VK_FORMAT_R8_UINT](../formats.html#VkFormat) and [VK_FORMAT_R32_UINT](../formats.html#VkFormat) are initially supported
for images with [optical flow usage](#opticalflow-usage)
[VK_OPTICAL_FLOW_USAGE_COST_BIT_NV](#VkOpticalFlowUsageFlagBitsNV).
It is recommended to use [VK_FORMAT_R8_UINT](../formats.html#VkFormat) because of the lower
bandwidth. |

The [VkOpticalFlowImageFormatInfoNV](#VkOpticalFlowImageFormatInfoNV) structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkOpticalFlowImageFormatInfoNV {
    VkStructureType              sType;
    const void*                  pNext;
    VkOpticalFlowUsageFlagsNV    usage;
} VkOpticalFlowImageFormatInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `usage` is a bitmask of
[VkOpticalFlowUsageFlagBitsNV](#VkOpticalFlowUsageFlagBitsNV) describing the intended optical flow
usage of the image.

Valid Usage (Implicit)

* 
[](#VUID-VkOpticalFlowImageFormatInfoNV-sType-sType) VUID-VkOpticalFlowImageFormatInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPTICAL_FLOW_IMAGE_FORMAT_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkOpticalFlowImageFormatInfoNV-usage-parameter) VUID-VkOpticalFlowImageFormatInfoNV-usage-parameter

 `usage` **must** be a valid combination of [VkOpticalFlowUsageFlagBitsNV](#VkOpticalFlowUsageFlagBitsNV) values

* 
[](#VUID-VkOpticalFlowImageFormatInfoNV-usage-requiredbitmask) VUID-VkOpticalFlowImageFormatInfoNV-usage-requiredbitmask

 `usage` **must** not be `0`

Structure Chaining

[Extends the structures](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](../resources.html#VkImageCreateInfo)

* 
[VkPhysicalDeviceImageFormatInfo2](../capabilities.html#VkPhysicalDeviceImageFormatInfo2)

Bits which **can** be set in [VkOpticalFlowImageFormatInfoNV](#VkOpticalFlowImageFormatInfoNV)::`usage`,
controlling optical flow usage, are:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowUsageFlagBitsNV {
    VK_OPTICAL_FLOW_USAGE_UNKNOWN_NV = 0,
    VK_OPTICAL_FLOW_USAGE_INPUT_BIT_NV = 0x00000001,
    VK_OPTICAL_FLOW_USAGE_OUTPUT_BIT_NV = 0x00000002,
    VK_OPTICAL_FLOW_USAGE_HINT_BIT_NV = 0x00000004,
    VK_OPTICAL_FLOW_USAGE_COST_BIT_NV = 0x00000008,
    VK_OPTICAL_FLOW_USAGE_GLOBAL_FLOW_BIT_NV = 0x00000010,
} VkOpticalFlowUsageFlagBitsNV;

* 
[VK_OPTICAL_FLOW_USAGE_INPUT_BIT_NV](#VkOpticalFlowUsageFlagBitsNV) specifies that the image **can**
be used as input or reference frame for an optical flow operation.

* 
[VK_OPTICAL_FLOW_USAGE_OUTPUT_BIT_NV](#VkOpticalFlowUsageFlagBitsNV) specifies that the image **can**
be used as output flow vector map for an optical flow operation.

* 
[VK_OPTICAL_FLOW_USAGE_HINT_BIT_NV](#VkOpticalFlowUsageFlagBitsNV) specifies that the image **can** be
used as hint flow vector map for an optical flow operation.

* 
[VK_OPTICAL_FLOW_USAGE_COST_BIT_NV](#VkOpticalFlowUsageFlagBitsNV) specifies that the image **can** be
used as output cost map for an optical flow operation.

* 
[VK_OPTICAL_FLOW_USAGE_GLOBAL_FLOW_BIT_NV](#VkOpticalFlowUsageFlagBitsNV) specifies that the image
**can** be used as global flow vector for an optical flow operation.

// Provided by VK_NV_optical_flow
typedef VkFlags   VkOpticalFlowUsageFlagsNV;

`VkOpticalFlowUsageFlagsNV` is a bitmask type for setting a mask of zero
or more [VkOpticalFlowUsageFlagBitsNV](#VkOpticalFlowUsageFlagBitsNV).

The [VkOpticalFlowImageFormatPropertiesNV](#VkOpticalFlowImageFormatPropertiesNV) structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkOpticalFlowImageFormatPropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    VkFormat           format;
} VkOpticalFlowImageFormatPropertiesNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `format` is a [VkFormat](../formats.html#VkFormat) that specifies
the format that can be used with the specified optical flow image
usages.

Valid Usage (Implicit)

* 
[](#VUID-VkOpticalFlowImageFormatPropertiesNV-sType-sType) VUID-VkOpticalFlowImageFormatPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPTICAL_FLOW_IMAGE_FORMAT_PROPERTIES_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkOpticalFlowImageFormatPropertiesNV-pNext-pNext) VUID-VkOpticalFlowImageFormatPropertiesNV-pNext-pNext

 `pNext` **must** be `NULL`

Optical flow session objects are abstracted and represented by
[VkOpticalFlowSessionNV](#VkOpticalFlowSessionNV) handles:

// Provided by VK_NV_optical_flow
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkOpticalFlowSessionNV)

To create an optical flow session object, call:

// Provided by VK_NV_optical_flow
VkResult vkCreateOpticalFlowSessionNV(
    VkDevice                                    device,
    const VkOpticalFlowSessionCreateInfoNV*     pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkOpticalFlowSessionNV*                     pSession);

* 
`device` is the logical device that creates the optical flow session
object.

* 
`pCreateInfo` is a pointer to a
[VkOpticalFlowSessionCreateInfoNV](#VkOpticalFlowSessionCreateInfoNV) structure containing parameters
specifying the creation of the optical flow session.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

* 
`pSession` is a pointer to a [VkOpticalFlowSessionNV](#VkOpticalFlowSessionNV) handle
specifying the optical flow session object which will be created by this
function when it returns [VK_SUCCESS](../fundamentals.html#VkResult)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateOpticalFlowSessionNV-device-parameter) VUID-vkCreateOpticalFlowSessionNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateOpticalFlowSessionNV-pCreateInfo-parameter) VUID-vkCreateOpticalFlowSessionNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkOpticalFlowSessionCreateInfoNV](#VkOpticalFlowSessionCreateInfoNV) structure

* 
[](#VUID-vkCreateOpticalFlowSessionNV-pAllocator-parameter) VUID-vkCreateOpticalFlowSessionNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateOpticalFlowSessionNV-pSession-parameter) VUID-vkCreateOpticalFlowSessionNV-pSession-parameter

 `pSession` **must** be a valid pointer to a [VkOpticalFlowSessionNV](#VkOpticalFlowSessionNV) handle

* 
[](#VUID-vkCreateOpticalFlowSessionNV-device-queuecount) VUID-vkCreateOpticalFlowSessionNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The [VkOpticalFlowSessionCreateInfoNV](#VkOpticalFlowSessionCreateInfoNV) structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkOpticalFlowSessionCreateInfoNV {
    VkStructureType                      sType;
    void*                                pNext;
    uint32_t                             width;
    uint32_t                             height;
    VkFormat                             imageFormat;
    VkFormat                             flowVectorFormat;
    VkFormat                             costFormat;
    VkOpticalFlowGridSizeFlagsNV         outputGridSize;
    VkOpticalFlowGridSizeFlagsNV         hintGridSize;
    VkOpticalFlowPerformanceLevelNV      performanceLevel;
    VkOpticalFlowSessionCreateFlagsNV    flags;
} VkOpticalFlowSessionCreateInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`width` is the width in pixels of the input or reference frame to be
bound to this optical flow session.

* 
`height` is the height in pixels of the input or reference frame to
be bound to this optical flow session.

* 
`imageFormat` is the [VkFormat](../formats.html#VkFormat) of the input and reference frame
to be bound to this optical flow session.

* 
`flowVectorFormat` is the [VkFormat](../formats.html#VkFormat) of the flow vector maps
(output or hint) to be bound to this optical flow session.

* 
`costFormat` is the [VkFormat](../formats.html#VkFormat) of the cost maps to be bound to
this optical flow session.

* 
`outputGridSize` is exactly one bit of
[VkOpticalFlowGridSizeFlagsNV](#VkOpticalFlowGridSizeFlagsNV) specifying the grid size of the
output flow and cost maps to be bound to this optical flow session.
The size of the output flow and cost maps is determined by
`VkOpticalFlowSessionCreateInfoNV`::`width` and
`VkOpticalFlowSessionCreateInfoNV`::`height` divided by
`VkOpticalFlowSessionCreateInfoNV`::`outputGridSize`.

* 
`hintGridSize` is one exactly bit of
[VkOpticalFlowGridSizeFlagsNV](#VkOpticalFlowGridSizeFlagsNV) specifying the grid size of the hint
flow vector maps to be bound to this optical flow session.
The size of the hint maps is determined by
`VkOpticalFlowSessionCreateInfoNV`::`width` and
`VkOpticalFlowSessionCreateInfoNV`::`height` divided by
`VkOpticalFlowSessionCreateInfoNV`::`hintGridSize`.

* 
`performanceLevel` is the [VkOpticalFlowPerformanceLevelNV](#VkOpticalFlowPerformanceLevelNV) used
for this optical flow session.

* 
`flags` are the [VkOpticalFlowSessionCreateFlagsNV](#VkOpticalFlowSessionCreateFlagsNV) used for
this optical flow session.

Valid Usage

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-width-07581) VUID-VkOpticalFlowSessionCreateInfoNV-width-07581

`width` **must** be greater than or equal to
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`minWidth` and less
than or equal to
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`maxWidth`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-height-07582) VUID-VkOpticalFlowSessionCreateInfoNV-height-07582

`height` **must** be greater than or equal to
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`minHeight` and less
than or equal to
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`maxHeight`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-imageFormat-07583) VUID-VkOpticalFlowSessionCreateInfoNV-imageFormat-07583

`imageFormat` **must** be one of the formats returned by
[vkGetPhysicalDeviceOpticalFlowImageFormatsNV](#vkGetPhysicalDeviceOpticalFlowImageFormatsNV) for
[VK_OPTICAL_FLOW_USAGE_INPUT_BIT_NV](#VkOpticalFlowUsageFlagBitsNV)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flowVectorFormat-07584) VUID-VkOpticalFlowSessionCreateInfoNV-flowVectorFormat-07584

`flowVectorFormat` **must** be one of the formats returned by
[vkGetPhysicalDeviceOpticalFlowImageFormatsNV](#vkGetPhysicalDeviceOpticalFlowImageFormatsNV) for
[VK_OPTICAL_FLOW_USAGE_OUTPUT_BIT_NV](#VkOpticalFlowUsageFlagBitsNV)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-costFormat-07585) VUID-VkOpticalFlowSessionCreateInfoNV-costFormat-07585

`costFormat` **must** be one of the formats returned by
[vkGetPhysicalDeviceOpticalFlowImageFormatsNV](#vkGetPhysicalDeviceOpticalFlowImageFormatsNV) for
[VK_OPTICAL_FLOW_USAGE_COST_BIT_NV](#VkOpticalFlowUsageFlagBitsNV) if
[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_COST_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) is set in
`flags`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-07586) VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-07586

`outputGridSize` **must** be exactly one of the bits reported in
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`supportedOutputGridSizes`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-hintGridSize-07587) VUID-VkOpticalFlowSessionCreateInfoNV-hintGridSize-07587

`hintGridSize` **must** be exactly one of the bits reported in
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`supportedHintGridSizes`
if [VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_HINT_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) is set in
`flags`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-07588) VUID-VkOpticalFlowSessionCreateInfoNV-flags-07588

[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_HINT_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) **must** not be set
in `flags` if
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`hintSupported` is
[VK_FALSE](../fundamentals.html#VK_FALSE)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-07589) VUID-VkOpticalFlowSessionCreateInfoNV-flags-07589

[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_COST_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) **must** not be set
in `flags` if
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`costSupported` is
[VK_FALSE](../fundamentals.html#VK_FALSE)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-07590) VUID-VkOpticalFlowSessionCreateInfoNV-flags-07590

[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_GLOBAL_FLOW_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) **must** not
be set in `flags` if
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`globalFlowSupported`
is [VK_FALSE](../fundamentals.html#VK_FALSE)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-07591) VUID-VkOpticalFlowSessionCreateInfoNV-flags-07591

[VK_OPTICAL_FLOW_SESSION_CREATE_ALLOW_REGIONS_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) **must** not be
set in `flags` if
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`maxNumRegionsOfInterest`
is 0

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-07592) VUID-VkOpticalFlowSessionCreateInfoNV-flags-07592

[VK_OPTICAL_FLOW_SESSION_CREATE_BOTH_DIRECTIONS_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) **must** not be
set in `flags` if
`VkPhysicalDeviceOpticalFlowPropertiesNV`::`bidirectionalFlowSupported`
is [VK_FALSE](../fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-sType-sType) VUID-VkOpticalFlowSessionCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPTICAL_FLOW_SESSION_CREATE_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-pNext-pNext) VUID-VkOpticalFlowSessionCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkOpticalFlowSessionCreatePrivateDataInfoNV](#VkOpticalFlowSessionCreatePrivateDataInfoNV)

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-sType-unique) VUID-VkOpticalFlowSessionCreateInfoNV-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-imageFormat-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-imageFormat-parameter

 `imageFormat` **must** be a valid [VkFormat](../formats.html#VkFormat) value

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flowVectorFormat-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-flowVectorFormat-parameter

 `flowVectorFormat` **must** be a valid [VkFormat](../formats.html#VkFormat) value

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-costFormat-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-costFormat-parameter

 If `costFormat` is not `0`, `costFormat` **must** be a valid [VkFormat](../formats.html#VkFormat) value

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-parameter

 `outputGridSize` **must** be a valid combination of [VkOpticalFlowGridSizeFlagBitsNV](#VkOpticalFlowGridSizeFlagBitsNV) values

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-requiredbitmask) VUID-VkOpticalFlowSessionCreateInfoNV-outputGridSize-requiredbitmask

 `outputGridSize` **must** not be `0`

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-hintGridSize-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-hintGridSize-parameter

 `hintGridSize` **must** be a valid combination of [VkOpticalFlowGridSizeFlagBitsNV](#VkOpticalFlowGridSizeFlagBitsNV) values

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-performanceLevel-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-performanceLevel-parameter

 If `performanceLevel` is not `0`, `performanceLevel` **must** be a valid [VkOpticalFlowPerformanceLevelNV](#VkOpticalFlowPerformanceLevelNV) value

* 
[](#VUID-VkOpticalFlowSessionCreateInfoNV-flags-parameter) VUID-VkOpticalFlowSessionCreateInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkOpticalFlowSessionCreateFlagBitsNV](#VkOpticalFlowSessionCreateFlagBitsNV) values

The [VkOpticalFlowSessionCreatePrivateDataInfoNV](#VkOpticalFlowSessionCreatePrivateDataInfoNV) structure is for NV
internal use only and is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkOpticalFlowSessionCreatePrivateDataInfoNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           id;
    uint32_t           size;
    const void*        pPrivateData;
} VkOpticalFlowSessionCreatePrivateDataInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`id` is an identifier for data which is passed at a memory location
specified in
`VkOpticalFlowSessionCreatePrivateDataInfoNV`::`pPrivateData`.

* 
`size` is the size of data in bytes which is passed at a memory
location specified in
`VkOpticalFlowSessionCreatePrivateDataInfoNV`::`pPrivateData`.

* 
`pPrivateData` is a pointer to NV internal data.

Valid Usage (Implicit)

* 
[](#VUID-VkOpticalFlowSessionCreatePrivateDataInfoNV-sType-sType) VUID-VkOpticalFlowSessionCreatePrivateDataInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPTICAL_FLOW_SESSION_CREATE_PRIVATE_DATA_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkOpticalFlowSessionCreatePrivateDataInfoNV-pPrivateData-parameter) VUID-VkOpticalFlowSessionCreatePrivateDataInfoNV-pPrivateData-parameter

 `pPrivateData` **must** be a pointer value

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkOpticalFlowSessionCreateInfoNV](#VkOpticalFlowSessionCreateInfoNV)

Optical flow vectors are generated block-wise, one vector for each block of
NxN pixels (referred to as grid).

Bits which **can** be set in
[VkOpticalFlowSessionCreateInfoNV](#VkOpticalFlowSessionCreateInfoNV)::`outputGridSize` and
[VkOpticalFlowSessionCreateInfoNV](#VkOpticalFlowSessionCreateInfoNV)::`hintGridSize`, or which are
returned in
[VkPhysicalDeviceOpticalFlowPropertiesNV](../limits.html#VkPhysicalDeviceOpticalFlowPropertiesNV)::`supportedOutputGridSizes`
and
[VkPhysicalDeviceOpticalFlowPropertiesNV](../limits.html#VkPhysicalDeviceOpticalFlowPropertiesNV)::`supportedHintGridSizes`
controlling optical flow grid sizes, are:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowGridSizeFlagBitsNV {
    VK_OPTICAL_FLOW_GRID_SIZE_UNKNOWN_NV = 0,
    VK_OPTICAL_FLOW_GRID_SIZE_1X1_BIT_NV = 0x00000001,
    VK_OPTICAL_FLOW_GRID_SIZE_2X2_BIT_NV = 0x00000002,
    VK_OPTICAL_FLOW_GRID_SIZE_4X4_BIT_NV = 0x00000004,
    VK_OPTICAL_FLOW_GRID_SIZE_8X8_BIT_NV = 0x00000008,
} VkOpticalFlowGridSizeFlagBitsNV;

* 
[VK_OPTICAL_FLOW_GRID_SIZE_1X1_BIT_NV](#VkOpticalFlowGridSizeFlagBitsNV) specifies that grid is 1x1
pixel.

* 
[VK_OPTICAL_FLOW_GRID_SIZE_2X2_BIT_NV](#VkOpticalFlowGridSizeFlagBitsNV) specifies that grid is 2x2
pixel.

* 
[VK_OPTICAL_FLOW_GRID_SIZE_4X4_BIT_NV](#VkOpticalFlowGridSizeFlagBitsNV) specifies that grid is 4x4
pixel.

* 
[VK_OPTICAL_FLOW_GRID_SIZE_8X8_BIT_NV](#VkOpticalFlowGridSizeFlagBitsNV) specifies that grid is 8x8
pixel.

// Provided by VK_NV_optical_flow
typedef VkFlags   VkOpticalFlowGridSizeFlagsNV;

`VkOpticalFlowGridSizeFlagsNV` is a bitmask type for setting a mask of
zero or more [VkOpticalFlowGridSizeFlagBitsNV](#VkOpticalFlowGridSizeFlagBitsNV).

Optical flow exposes performance levels which the application **can** choose
based on the desired performance and quality requirement.

The optical flow performance level types are defined with the following:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowPerformanceLevelNV {
    VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_UNKNOWN_NV = 0,
    VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_SLOW_NV = 1,
    VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_MEDIUM_NV = 2,
    VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_FAST_NV = 3,
} VkOpticalFlowPerformanceLevelNV;

* 
[VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_SLOW_NV](#VkOpticalFlowPerformanceLevelNV) is a level with slower
performance but higher quality.

* 
[VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_MEDIUM_NV](#VkOpticalFlowPerformanceLevelNV) is a level with medium
performance and medium quality.

* 
[VK_OPTICAL_FLOW_PERFORMANCE_LEVEL_FAST_NV](#VkOpticalFlowPerformanceLevelNV) is a preset with higher
performance but lower quality.

Bits which **can** be set in
[VkOpticalFlowSessionCreateInfoNV](#VkOpticalFlowSessionCreateInfoNV)::`flags`, controlling optical
flow session operations, are:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowSessionCreateFlagBitsNV {
    VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_HINT_BIT_NV = 0x00000001,
    VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_COST_BIT_NV = 0x00000002,
    VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_GLOBAL_FLOW_BIT_NV = 0x00000004,
    VK_OPTICAL_FLOW_SESSION_CREATE_ALLOW_REGIONS_BIT_NV = 0x00000008,
    VK_OPTICAL_FLOW_SESSION_CREATE_BOTH_DIRECTIONS_BIT_NV = 0x00000010,
} VkOpticalFlowSessionCreateFlagBitsNV;

* 
[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_HINT_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) specifies that a
[VkImageView](../resources.html#VkImageView) with external flow vectors will be used as hints in
performing the motion search and **must** be bound to
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_HINT_NV](#VkOpticalFlowSessionBindingPointNV).

* 
[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_COST_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) specifies that
the cost for the forward flow is generated in a [VkImageView](../resources.html#VkImageView) which
**must** be bound to [VK_OPTICAL_FLOW_SESSION_BINDING_POINT_COST_NV](#VkOpticalFlowSessionBindingPointNV).
Additionally, if
[VK_OPTICAL_FLOW_SESSION_CREATE_BOTH_DIRECTIONS_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) is also set,
the cost for backward flow is generated in a [VkImageView](../resources.html#VkImageView) which
**must** be bound to
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_BACKWARD_COST_NV](#VkOpticalFlowSessionBindingPointNV).
The cost is the confidence level of the flow vector for each grid in the
frame.
The Cost implies how (in)accurate the flow vector is.
Higher cost value implies the flow vector to be less accurate and
vice-versa.

* 
[VK_OPTICAL_FLOW_SESSION_CREATE_ENABLE_GLOBAL_FLOW_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) specifies
that a global flow vector is estimated from forward flow in a single
pixel [VkImageView](../resources.html#VkImageView) which **must** be bound to
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_GLOBAL_FLOW_NV](#VkOpticalFlowSessionBindingPointNV).

* 
[VK_OPTICAL_FLOW_SESSION_CREATE_ALLOW_REGIONS_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) specifies that
regions of interest **can** be specified in
[VkOpticalFlowExecuteInfoNV](#VkOpticalFlowExecuteInfoNV).

* 
[VK_OPTICAL_FLOW_SESSION_CREATE_BOTH_DIRECTIONS_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) specifies
that backward flow is generated in addition to forward flow which is
always generated.

`VkOpticalFlowSessionCreateFlagsNV` is a bitmask type for setting a mask
of zero or more [VkOpticalFlowSessionCreateFlagBitsNV](#VkOpticalFlowSessionCreateFlagBitsNV).

// Provided by VK_NV_optical_flow
typedef VkFlags   VkOpticalFlowSessionCreateFlagsNV;

To destroy an optical flow session object, call:

// Provided by VK_NV_optical_flow
void vkDestroyOpticalFlowSessionNV(
    VkDevice                                    device,
    VkOpticalFlowSessionNV                      session,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the device that was used for the creation of the optical
flow session.

* 
`session` is the optical flow session to be destroyed.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyOpticalFlowSessionNV-device-parameter) VUID-vkDestroyOpticalFlowSessionNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyOpticalFlowSessionNV-session-parameter) VUID-vkDestroyOpticalFlowSessionNV-session-parameter

 `session` **must** be a valid [VkOpticalFlowSessionNV](#VkOpticalFlowSessionNV) handle

* 
[](#VUID-vkDestroyOpticalFlowSessionNV-pAllocator-parameter) VUID-vkDestroyOpticalFlowSessionNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyOpticalFlowSessionNV-session-parent) VUID-vkDestroyOpticalFlowSessionNV-session-parent

 `session` **must** have been created, allocated, or retrieved from `device`

To bind a Vulkan image to an optical flow session object, call:

// Provided by VK_NV_optical_flow
VkResult vkBindOpticalFlowSessionImageNV(
    VkDevice                                    device,
    VkOpticalFlowSessionNV                      session,
    VkOpticalFlowSessionBindingPointNV          bindingPoint,
    VkImageView                                 view,
    VkImageLayout                               layout);

* 
`device` is the device which owns the optical flow session object
`session`.

* 
`session` is the optical flow session object to which the image view
is to be bound.

* 
`bindingPoint` specifies the binding point
[VkOpticalFlowSessionBindingPointNV](#VkOpticalFlowSessionBindingPointNV) to which the image view is
bound.

* 
`view` is a [VkImageView](../resources.html#VkImageView) to be bound.

* 
`layout` **must** specify the layout that the image subresources
accessible from `view` will be in at the time the optical flow
vectors are calculated with [vkCmdOpticalFlowExecuteNV](#vkCmdOpticalFlowExecuteNV) on a
`VkDevice`.

Valid Usage (Implicit)

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-device-parameter) VUID-vkBindOpticalFlowSessionImageNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-session-parameter) VUID-vkBindOpticalFlowSessionImageNV-session-parameter

 `session` **must** be a valid [VkOpticalFlowSessionNV](#VkOpticalFlowSessionNV) handle

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-bindingPoint-parameter) VUID-vkBindOpticalFlowSessionImageNV-bindingPoint-parameter

 `bindingPoint` **must** be a valid [VkOpticalFlowSessionBindingPointNV](#VkOpticalFlowSessionBindingPointNV) value

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-view-parameter) VUID-vkBindOpticalFlowSessionImageNV-view-parameter

 If `view` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `view` **must** be a valid [VkImageView](../resources.html#VkImageView) handle

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-layout-parameter) VUID-vkBindOpticalFlowSessionImageNV-layout-parameter

 `layout` **must** be a valid [VkImageLayout](../resources.html#VkImageLayout) value

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-session-parent) VUID-vkBindOpticalFlowSessionImageNV-session-parent

 `session` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkBindOpticalFlowSessionImageNV-view-parent) VUID-vkBindOpticalFlowSessionImageNV-view-parent

 If `view` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

The optical flow session binding points are defined with the following:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowSessionBindingPointNV {
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_UNKNOWN_NV = 0,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_INPUT_NV = 1,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_REFERENCE_NV = 2,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_HINT_NV = 3,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_FLOW_VECTOR_NV = 4,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_BACKWARD_FLOW_VECTOR_NV = 5,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_COST_NV = 6,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_BACKWARD_COST_NV = 7,
    VK_OPTICAL_FLOW_SESSION_BINDING_POINT_GLOBAL_FLOW_NV = 8,
} VkOpticalFlowSessionBindingPointNV;

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_INPUT_NV](#VkOpticalFlowSessionBindingPointNV) specifies the
binding point for the input frame.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_REFERENCE_NV](#VkOpticalFlowSessionBindingPointNV) specifies the
binding point for the input reference frame.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_HINT_NV](#VkOpticalFlowSessionBindingPointNV) specifies the
binding point for the optional external hint flow vectors.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_FLOW_VECTOR_NV](#VkOpticalFlowSessionBindingPointNV) specifies the
binding point for output flow vectors of default forward flow
calculation.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_BACKWARD_FLOW_VECTOR_NV](#VkOpticalFlowSessionBindingPointNV)
specifies the binding point for the optional output flow vector map of
optional backward flow calculation.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_COST_NV](#VkOpticalFlowSessionBindingPointNV) specifies the
binding point for the optional output cost map of default forward flow
calculation.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_BACKWARD_COST_NV](#VkOpticalFlowSessionBindingPointNV) specifies
the binding point for the optional output cost map of optional backward
flow calculation.

* 
[VK_OPTICAL_FLOW_SESSION_BINDING_POINT_GLOBAL_FLOW_NV](#VkOpticalFlowSessionBindingPointNV) specifies the
binding point for the optional global flow value of default forward flow
calculation.

Default direction of flow estimation is forward which calculates the optical
flow from input frame to reference frame.
Optionally backward flow estimation can be additionally calculated.
An output flow vector (Vx, Vy) means that current pixel (x, y) of input
frame can be found at location (x+Vx, y+Vy) in reference frame.
A backward flow vector (Vx, Vy) means that current pixel (x, y) of reference
frame can be found at location (x+Vx, y+Vy) in input frame.

To calculate optical flow vectors from two input frames, call:

// Provided by VK_NV_optical_flow
void vkCmdOpticalFlowExecuteNV(
    VkCommandBuffer                             commandBuffer,
    VkOpticalFlowSessionNV                      session,
    const VkOpticalFlowExecuteInfoNV*           pExecuteInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`session` is the optical flow session object on which this command
is operating.

* 
`pExecuteInfo` Info is a pointer to a
[VkOpticalFlowExecuteInfoNV](#VkOpticalFlowExecuteInfoNV).

Valid Usage (Implicit)

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-parameter) VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](../cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-session-parameter) VUID-vkCmdOpticalFlowExecuteNV-session-parameter

 `session` **must** be a valid [VkOpticalFlowSessionNV](#VkOpticalFlowSessionNV) handle

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-pExecuteInfo-parameter) VUID-vkCmdOpticalFlowExecuteNV-pExecuteInfo-parameter

 `pExecuteInfo` **must** be a valid pointer to a valid [VkOpticalFlowExecuteInfoNV](#VkOpticalFlowExecuteInfoNV) structure

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-recording) VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-cmdpool) VUID-vkCmdOpticalFlowExecuteNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_OPTICAL_FLOW_BIT_NV](../devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-renderpass) VUID-vkCmdOpticalFlowExecuteNV-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-suspended) VUID-vkCmdOpticalFlowExecuteNV-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-videocoding) VUID-vkCmdOpticalFlowExecuteNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdOpticalFlowExecuteNV-commonparent) VUID-vkCmdOpticalFlowExecuteNV-commonparent

 Both of `commandBuffer`, and `session` **must** have been created, allocated, or retrieved from the same [VkDevice](../devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../devsandqueues.html#VkQueueFlagBits) | [Command Type](../fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_OPTICAL_FLOW_BIT_NV | Action |

Conditional Rendering

vkCmdOpticalFlowExecuteNV is not affected by [conditional rendering](../drawing.html#drawing-conditional-rendering)

The [VkOpticalFlowExecuteInfoNV](#VkOpticalFlowExecuteInfoNV) structure is defined as:

// Provided by VK_NV_optical_flow
typedef struct VkOpticalFlowExecuteInfoNV {
    VkStructureType                sType;
    void*                          pNext;
    VkOpticalFlowExecuteFlagsNV    flags;
    uint32_t                       regionCount;
    const VkRect2D*                pRegions;
} VkOpticalFlowExecuteInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` are the [VkOpticalFlowExecuteFlagsNV](#VkOpticalFlowExecuteFlagsNV) used for this
command.

* 
`regionCount` is the number of regions of interest specified in
`pRegions`.

* 
`pRegions` is a pointer to `regionCount` `VkRect2D` regions
of interest.

Valid Usage

* 
[](#VUID-VkOpticalFlowExecuteInfoNV-regionCount-07593) VUID-VkOpticalFlowExecuteInfoNV-regionCount-07593

`regionCount` **must** be 0 if
[VK_OPTICAL_FLOW_SESSION_CREATE_ALLOW_REGIONS_BIT_NV](#VkOpticalFlowSessionCreateFlagBitsNV) was not set
for `VkOpticalFlowSessionNV` on which this command is operating

Valid Usage (Implicit)

* 
[](#VUID-VkOpticalFlowExecuteInfoNV-sType-sType) VUID-VkOpticalFlowExecuteInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPTICAL_FLOW_EXECUTE_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkOpticalFlowExecuteInfoNV-pNext-pNext) VUID-VkOpticalFlowExecuteInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkOpticalFlowExecuteInfoNV-flags-parameter) VUID-VkOpticalFlowExecuteInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkOpticalFlowExecuteFlagBitsNV](#VkOpticalFlowExecuteFlagBitsNV) values

* 
[](#VUID-VkOpticalFlowExecuteInfoNV-pRegions-parameter) VUID-VkOpticalFlowExecuteInfoNV-pRegions-parameter

 If `regionCount` is not `0`, `pRegions` **must** be a valid pointer to an array of `regionCount` [VkRect2D](../fundamentals.html#VkRect2D) structures

Bits which **can** be set in [VkOpticalFlowExecuteInfoNV](#VkOpticalFlowExecuteInfoNV)::`flags`,
controlling optical flow execution, are:

// Provided by VK_NV_optical_flow
typedef enum VkOpticalFlowExecuteFlagBitsNV {
    VK_OPTICAL_FLOW_EXECUTE_DISABLE_TEMPORAL_HINTS_BIT_NV = 0x00000001,
} VkOpticalFlowExecuteFlagBitsNV;

* 
[VK_OPTICAL_FLOW_EXECUTE_DISABLE_TEMPORAL_HINTS_BIT_NV](#VkOpticalFlowExecuteFlagBitsNV) specifies
that temporal hints from previously generated flow vectors are not used.
If temporal hints are enabled, optical flow vectors from previous
[vkCmdOpticalFlowExecuteNV](#vkCmdOpticalFlowExecuteNV) call are automatically used as hints for
the current [vkCmdOpticalFlowExecuteNV](#vkCmdOpticalFlowExecuteNV) call, to take advantage of
temporal correlation in a video sequence.
Temporal hints should be disabled if there is a-priori knowledge of no
temporal correlation (e.g. a scene change, independent successive frame
pairs).

`VkOpticalFlowExecuteFlagsNV` is a bitmask type for setting a mask of
zero or more [VkOpticalFlowExecuteFlagBitsNV](#VkOpticalFlowExecuteFlagBitsNV).

// Provided by VK_NV_optical_flow
typedef VkFlags   VkOpticalFlowExecuteFlagsNV;
