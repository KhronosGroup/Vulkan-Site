# VkApplicationInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkApplicationInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkApplicationInfo - Structure specifying application information

The `VkApplicationInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkApplicationInfo {
    VkStructureType    sType;
    const void*        pNext;
    const char*        pApplicationName;
    uint32_t           applicationVersion;
    const char*        pEngineName;
    uint32_t           engineVersion;
    uint32_t           apiVersion;
} VkApplicationInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pApplicationName` is `NULL` or is a pointer to a null-terminated
UTF-8 string containing the name of the application.

* 
`applicationVersion` is an unsigned integer variable containing the
developer-supplied version number of the application.

* 
`pEngineName` is `NULL` or is a pointer to a null-terminated UTF-8
string containing the name of the engine (if any) used to create the
application.

* 
`engineVersion` is an unsigned integer variable containing the
developer-supplied version number of the engine used to create the
application.

* 
`apiVersion` **must** be the highest version of Vulkan that the
application is designed to use, encoded as described in
[Version Numbers](../../../../spec/latest/chapters/extensions.html#extendingvulkan-coreversions-versionnumbers).
The patch version number specified in `apiVersion` is ignored when
creating an instance object.
The variant version of the instance **must** match that requested in
`apiVersion`.

Vulkan 1.0 implementations were required to return
[VK_ERROR_INCOMPATIBLE_DRIVER](VkResult.html) if `apiVersion` was larger than 1.0.
Implementations that support Vulkan 1.1 or later **must** not return
[VK_ERROR_INCOMPATIBLE_DRIVER](VkResult.html) for any value of `apiVersion`
.

|  | Because Vulkan 1.0 implementations **may** fail with
| --- | --- |
[VK_ERROR_INCOMPATIBLE_DRIVER](VkResult.html), applications **should** determine the
version of Vulkan available before calling [vkCreateInstance](vkCreateInstance.html).
If the [vkGetInstanceProcAddr](vkGetInstanceProcAddr.html) returns `NULL` for
[vkEnumerateInstanceVersion](vkEnumerateInstanceVersion.html), it is a Vulkan 1.0 implementation.
Otherwise, the application **can** call [vkEnumerateInstanceVersion](vkEnumerateInstanceVersion.html) to
determine the version of Vulkan. |

As long as the instance supports at least Vulkan 1.1, an application **can**
use different versions of Vulkan with an instance than it does with a device
or physical device.

|  | The Khronos validation layers will treat `apiVersion` as the highest API
| --- | --- |
version the application targets, and will validate API usage against the
minimum of that version and the implementation version (instance or device,
depending on context).
If an application tries to use functionality from a greater version than
this, a validation error will be triggered.

For example, if the instance supports Vulkan 1.1 and three physical devices
support Vulkan 1.0, Vulkan 1.1, and Vulkan 1.2, respectively, and if the
application sets `apiVersion` to 1.2, the application **can** use the
following versions of Vulkan:

* 
Vulkan 1.0 **can** be used with the instance and with all physical devices.

* 
Vulkan 1.1 **can** be used with the instance and with the physical devices
that support Vulkan 1.1 and Vulkan 1.2.

* 
Vulkan 1.2 **can** be used with the physical device that supports Vulkan
1.2.

If we modify the above example so that the application sets `apiVersion`
to 1.1, then the application **must** not use Vulkan 1.2 functionality on the
physical device that supports Vulkan 1.2. |

|  | Providing a `NULL` [VkInstanceCreateInfo](VkInstanceCreateInfo.html)::`pApplicationInfo` or
| --- | --- |
providing an `apiVersion` of 0 is equivalent to providing an
`apiVersion` of
`VK_MAKE_API_VERSION(0,1,0,0)`. |

Valid Usage

* 
[](#VUID-VkApplicationInfo-apiVersion-04010) VUID-VkApplicationInfo-apiVersion-04010

If `apiVersion` is not `0`, then it **must** be greater than or equal
to [VK_API_VERSION_1_0](VK_API_VERSION_1_0.html)

Valid Usage (Implicit)

* 
[](#VUID-VkApplicationInfo-sType-sType) VUID-VkApplicationInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_APPLICATION_INFO](VkStructureType.html)

* 
[](#VUID-VkApplicationInfo-pNext-pNext) VUID-VkApplicationInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkApplicationInfo-pApplicationName-parameter) VUID-VkApplicationInfo-pApplicationName-parameter

 If `pApplicationName` is not `NULL`, `pApplicationName` **must** be a null-terminated UTF-8 string

* 
[](#VUID-VkApplicationInfo-pEngineName-parameter) VUID-VkApplicationInfo-pEngineName-parameter

 If `pEngineName` is not `NULL`, `pEngineName` **must** be a null-terminated UTF-8 string

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkInstanceCreateInfo](VkInstanceCreateInfo.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/initialization.html#VkApplicationInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
