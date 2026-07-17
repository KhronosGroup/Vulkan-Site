# Devices and Queues

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/devsandqueues.html

## Table of Contents

- [Physical Devices](#devsandqueues-physical-device-enumeration)
- [Devices](#devsandqueues-devices)
- [Device Creation](#devsandqueues-device-creation)
- [Device Use](#devsandqueues-use)
- [Lost Device](#devsandqueues-lost-device)
- [Device Destruction](#devsandqueues-destruction)
- [Queues](#devsandqueues-queues)
- [Queue Family Properties](#devsandqueues-queueprops)
- [Queue_Family_Properties](#devsandqueues-queueprops)
- [Queue Creation](#devsandqueues-queue-creation)
- [Queue Family Index](#devsandqueues-index)
- [Queue_Family_Index](#devsandqueues-index)
- [Queue Priority](#devsandqueues-priority)
- [Queue Submission](#devsandqueues-submission)
- [Sparse Memory Binding](#devsandqueues-sparsebinding)
- [Sparse_Memory_Binding](#devsandqueues-sparsebinding)
- [Queue Destruction](#devsandqueues-queuedestruction)

## Content

Once Vulkan is initialized, devices and queues are the primary objects used
to interact with a Vulkan implementation.

Vulkan separates the concept of *physical* and *logical* devices.
A physical device usually represents a single complete implementation of
Vulkan (excluding instance-level functionality) available to the host, of
which there are a finite number.
A logical device represents an instance of that implementation with its own
state and resources independent of other logical devices.

Physical devices **cannot** be independently destroyed, and are instead
destroyed with the [VkInstance](initialization.html#VkInstance) that they were retrieved from.

Physical devices are represented by `VkPhysicalDevice` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_HANDLE(VkPhysicalDevice)

To retrieve a list of physical device objects representing the physical
devices installed in the system, call:

// Provided by VK_VERSION_1_0
VkResult vkEnumeratePhysicalDevices(
    VkInstance                                  instance,
    uint32_t*                                   pPhysicalDeviceCount,
    VkPhysicalDevice*                           pPhysicalDevices);

* 
`instance` is a handle to a Vulkan instance previously created with
[vkCreateInstance](initialization.html#vkCreateInstance).

* 
`pPhysicalDeviceCount` is a pointer to an integer related to the
number of physical devices available or queried, as described below.

* 
`pPhysicalDevices` is either `NULL` or a pointer to an array of
`VkPhysicalDevice` handles.

If `pPhysicalDevices` is `NULL`, then the number of physical devices
available is returned in `pPhysicalDeviceCount`.
Otherwise, `pPhysicalDeviceCount` **must** point to a variable set by the
application to the number of elements in the `pPhysicalDevices` array,
and on return the variable is overwritten with the number of handles
actually written to `pPhysicalDevices`.
If `pPhysicalDeviceCount` is less than the number of physical devices
available, at most `pPhysicalDeviceCount` structures will be written,
and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to
indicate that not all the available physical devices were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumeratePhysicalDevices-instance-parameter) VUID-vkEnumeratePhysicalDevices-instance-parameter

 `instance` **must** be a valid [VkInstance](initialization.html#VkInstance) handle

* 
[](#VUID-vkEnumeratePhysicalDevices-pPhysicalDeviceCount-parameter) VUID-vkEnumeratePhysicalDevices-pPhysicalDeviceCount-parameter

 `pPhysicalDeviceCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumeratePhysicalDevices-pPhysicalDevices-parameter) VUID-vkEnumeratePhysicalDevices-pPhysicalDevices-parameter

 If the value referenced by `pPhysicalDeviceCount` is not `0`, and `pPhysicalDevices` is not `NULL`, `pPhysicalDevices` **must** be a valid pointer to an array of `pPhysicalDeviceCount` [VkPhysicalDevice](#VkPhysicalDevice) handles

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To query general properties of physical devices once enumerated, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2). See [Legacy Functionality](../appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceProperties(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceProperties*                 pProperties);

* 
`physicalDevice` is the handle to the physical device whose
properties will be queried.

* 
`pProperties` is a pointer to a [VkPhysicalDeviceProperties](#VkPhysicalDeviceProperties)
structure in which properties are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceProperties-pProperties-parameter) VUID-vkGetPhysicalDeviceProperties-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkPhysicalDeviceProperties](#VkPhysicalDeviceProperties) structure

The `VkPhysicalDeviceProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPhysicalDeviceProperties {
    uint32_t                            apiVersion;
    uint32_t                            driverVersion;
    uint32_t                            vendorID;
    uint32_t                            deviceID;
    VkPhysicalDeviceType                deviceType;
    char                                deviceName[VK_MAX_PHYSICAL_DEVICE_NAME_SIZE];
    uint8_t                             pipelineCacheUUID[VK_UUID_SIZE];
    VkPhysicalDeviceLimits              limits;
    VkPhysicalDeviceSparseProperties    sparseProperties;
} VkPhysicalDeviceProperties;

* 
`apiVersion` is the version of Vulkan supported by the device,
encoded as described in [Version Numbers](extensions.html#extendingvulkan-coreversions-versionnumbers).

* 
`driverVersion` is the vendor-specified version of the driver.

* 
`vendorID` is a unique identifier for the *vendor* (see below) of
the physical device.

* 
`deviceID` is a unique identifier for the physical device among
devices available from the vendor.

* 
`deviceType` is a [VkPhysicalDeviceType](#VkPhysicalDeviceType) specifying the type of
device.

* 
`deviceName` is an array of [VK_MAX_PHYSICAL_DEVICE_NAME_SIZE](#VK_MAX_PHYSICAL_DEVICE_NAME_SIZE)
`char` containing a null-terminated UTF-8 string which is the name of
the device.

* 
`pipelineCacheUUID` is an array of [VK_UUID_SIZE](#VK_UUID_SIZE) `uint8_t`
values representing a universally unique identifier for the device.

* 
`limits` is the [VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits) structure specifying
device-specific limits of the physical device.
See [Limits](limits.html#limits) for details.

* 
`sparseProperties` is the [VkPhysicalDeviceSparseProperties](sparsemem.html#VkPhysicalDeviceSparseProperties)
structure specifying various sparse related properties of the physical
device.
See [Sparse Properties](sparsemem.html#sparsememory-physicalprops) for details.

|  | The value of `apiVersion` **may** be different than the version returned by
| --- | --- |
[vkEnumerateInstanceVersion](initialization.html#vkEnumerateInstanceVersion); either higher or lower.
In such cases, the application **must** not use functionality that exceeds the
version of Vulkan associated with a given object.
The `pApiVersion` parameter returned by [vkEnumerateInstanceVersion](initialization.html#vkEnumerateInstanceVersion)
is the version associated with a [VkInstance](initialization.html#VkInstance) and its children, except
for a [VkPhysicalDevice](#VkPhysicalDevice) and its children.
`VkPhysicalDeviceProperties`::`apiVersion` is the version associated
with a [VkPhysicalDevice](#VkPhysicalDevice) and its children. |

|  | The encoding of `driverVersion` is implementation-defined.
| --- | --- |
It **may** not use the same encoding as `apiVersion`.
Applications should follow information from the *vendor* on how to extract
the version information from `driverVersion`. |

On implementations that claim support for the [Roadmap 2022](../appendices/roadmap.html#roadmap-2022)
profile, the major and minor version expressed by `apiVersion` **must** be
at least Vulkan 1.3.

The `vendorID` and `deviceID` fields are provided to allow
applications to adapt to device characteristics that are not adequately
exposed by other Vulkan queries.

|  | These **may** include performance profiles, hardware errata, or other
| --- | --- |
characteristics. |

The *vendor* identified by `vendorID` is the entity responsible for the
most salient characteristics of the underlying implementation of the
[VkPhysicalDevice](#VkPhysicalDevice) being queried.

|  | For example, in the case of a discrete GPU implementation, this **should** be
| --- | --- |
the GPU chipset vendor.
In the case of a hardware accelerator integrated into a system-on-chip
(SoC), this **should** be the supplier of the silicon IP used to create the
accelerator. |

If the vendor has a [PCI
vendor ID](https://pcisig.com/membership/member-companies), the low 16 bits of `vendorID` **must** contain that PCI vendor
ID, and the remaining bits **must** be zero.
Otherwise, the value returned **must** be a valid Khronos vendor ID, obtained
as described in the [Vulkan Documentation and Extensions: Procedures and Conventions](introduction.html#vulkan-styleguide) document in the section “Registering a Vendor
ID with Khronos”.
Khronos vendor IDs are allocated starting at 0x10000, to distinguish them
from the PCI vendor ID namespace.
Khronos vendor IDs are symbolically defined in the [VkVendorId](#VkVendorId) type.

The vendor is also responsible for the value returned in `deviceID`.
If the implementation is driven primarily by a [PCI
device](https://pcisig.com/) with a [PCI device ID](https://pcisig.com/), the low 16 bits of
`deviceID` **must** contain that PCI device ID, and the remaining bits
**must** be zero.
Otherwise, the choice of what values to return **may** be dictated by operating
system or platform policies - but **should** uniquely identify both the device
version and any major configuration options (for example, core count in the
case of multicore devices).

|  | The same device ID **should** be used for all physical implementations of that
| --- | --- |
device version and configuration.
For example, all uses of a specific silicon IP GPU version and configuration
**should** use the same device ID, even if those uses occur in different SoCs. |

Khronos vendor IDs which **may** be returned in
[VkPhysicalDeviceProperties](#VkPhysicalDeviceProperties)::`vendorID` are:

// Provided by VK_VERSION_1_0
typedef enum VkVendorId {
    VK_VENDOR_ID_KHRONOS = 0x10000,
    VK_VENDOR_ID_VIV = 0x10001,
    VK_VENDOR_ID_VSI = 0x10002,
    VK_VENDOR_ID_KAZAN = 0x10003,
    VK_VENDOR_ID_CODEPLAY = 0x10004,
    VK_VENDOR_ID_MESA = 0x10005,
    VK_VENDOR_ID_POCL = 0x10006,
    VK_VENDOR_ID_MOBILEYE = 0x10007,
} VkVendorId;

|  | Khronos vendor IDs may be allocated by vendors at any time.
| --- | --- |
Only the latest canonical versions of this Specification, of the
corresponding `vk.xml` API Registry, and of the corresponding
`vulkan_core.h` header file **must** contain all reserved Khronos vendor IDs.

Only Khronos vendor IDs are given symbolic names at present.
PCI vendor IDs returned by the implementation can be looked up in the
PCI-SIG database. |

[VK_MAX_PHYSICAL_DEVICE_NAME_SIZE](#VK_MAX_PHYSICAL_DEVICE_NAME_SIZE) is the length in `char` values of
an array containing a physical device name string, as returned in
[VkPhysicalDeviceProperties](#VkPhysicalDeviceProperties)::`deviceName`.

#define VK_MAX_PHYSICAL_DEVICE_NAME_SIZE  256U

The physical device types which **may** be returned in
[VkPhysicalDeviceProperties](#VkPhysicalDeviceProperties)::`deviceType` are:

// Provided by VK_VERSION_1_0
typedef enum VkPhysicalDeviceType {
    VK_PHYSICAL_DEVICE_TYPE_OTHER = 0,
    VK_PHYSICAL_DEVICE_TYPE_INTEGRATED_GPU = 1,
    VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU = 2,
    VK_PHYSICAL_DEVICE_TYPE_VIRTUAL_GPU = 3,
    VK_PHYSICAL_DEVICE_TYPE_CPU = 4,
} VkPhysicalDeviceType;

* 
[VK_PHYSICAL_DEVICE_TYPE_OTHER](#VkPhysicalDeviceType) - the device does not match any
other available types.

* 
[VK_PHYSICAL_DEVICE_TYPE_INTEGRATED_GPU](#VkPhysicalDeviceType) - the device is typically
one embedded in or tightly coupled with the host.

* 
[VK_PHYSICAL_DEVICE_TYPE_DISCRETE_GPU](#VkPhysicalDeviceType) - the device is typically a
separate processor connected to the host via an interlink.

* 
[VK_PHYSICAL_DEVICE_TYPE_VIRTUAL_GPU](#VkPhysicalDeviceType) - the device is typically a
virtual node in a virtualization environment.

* 
[VK_PHYSICAL_DEVICE_TYPE_CPU](#VkPhysicalDeviceType) - the device is typically running on
the same processors as the host.

The physical device type is advertised for informational purposes only, and
does not directly affect the operation of the system.
However, the device type **may** correlate with other advertised properties or
capabilities of the system, such as how many memory heaps there are.

To query general properties of physical devices once enumerated, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceProperties2(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceProperties2*                pProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceProperties2
void vkGetPhysicalDeviceProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceProperties2*                pProperties);

* 
`physicalDevice` is the handle to the physical device whose
properties will be queried.

* 
`pProperties` is a pointer to a [VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)
structure in which properties are returned.

Each structure in `pProperties` and its `pNext` chain contains
members corresponding to implementation-dependent properties, behaviors, or
limits.
`vkGetPhysicalDeviceProperties2` fills in each member to specify the
corresponding value for the implementation.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceProperties2-pProperties-parameter) VUID-vkGetPhysicalDeviceProperties2-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure

The `VkPhysicalDeviceProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceProperties2 {
    VkStructureType               sType;
    void*                         pNext;
    VkPhysicalDeviceProperties    properties;
} VkPhysicalDeviceProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkPhysicalDeviceProperties2
typedef VkPhysicalDeviceProperties2 VkPhysicalDeviceProperties2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`properties` is a [VkPhysicalDeviceProperties](#VkPhysicalDeviceProperties) structure
describing properties of the physical device.
This structure is written with the same values as if it were written by
[vkGetPhysicalDeviceProperties](#vkGetPhysicalDeviceProperties).

The `pNext` chain of this structure is used to extend the structure with
properties defined by extensions.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceProperties2-sType-sType) VUID-VkPhysicalDeviceProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceProperties2-pNext-pNext) VUID-VkPhysicalDeviceProperties2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR), [VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT](limits.html#VkPhysicalDeviceBlendOperationAdvancedPropertiesEXT), [VkPhysicalDeviceClusterAccelerationStructurePropertiesNV](limits.html#VkPhysicalDeviceClusterAccelerationStructurePropertiesNV), [VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI](limits.html#VkPhysicalDeviceClusterCullingShaderPropertiesHUAWEI), [VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR](limits.html#VkPhysicalDeviceComputeShaderDerivativesPropertiesKHR), [VkPhysicalDeviceConservativeRasterizationPropertiesEXT](limits.html#VkPhysicalDeviceConservativeRasterizationPropertiesEXT), [VkPhysicalDeviceCooperativeMatrix2PropertiesNV](limits.html#VkPhysicalDeviceCooperativeMatrix2PropertiesNV), [VkPhysicalDeviceCooperativeMatrixPropertiesKHR](limits.html#VkPhysicalDeviceCooperativeMatrixPropertiesKHR), [VkPhysicalDeviceCooperativeMatrixPropertiesNV](limits.html#VkPhysicalDeviceCooperativeMatrixPropertiesNV), [VkPhysicalDeviceCooperativeVectorPropertiesNV](limits.html#VkPhysicalDeviceCooperativeVectorPropertiesNV), [VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR](limits.html#VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR), [VkPhysicalDeviceCudaKernelLaunchPropertiesNV](limits.html#VkPhysicalDeviceCudaKernelLaunchPropertiesNV), [VkPhysicalDeviceCustomBorderColorPropertiesEXT](limits.html#VkPhysicalDeviceCustomBorderColorPropertiesEXT), [VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties), [VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT), [VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT), [VkPhysicalDeviceDescriptorBufferTensorPropertiesARM](limits.html#VkPhysicalDeviceDescriptorBufferTensorPropertiesARM), [VkPhysicalDeviceDescriptorHeapPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorHeapPropertiesEXT), [VkPhysicalDeviceDescriptorHeapTensorPropertiesARM](limits.html#VkPhysicalDeviceDescriptorHeapTensorPropertiesARM), [VkPhysicalDeviceDescriptorIndexingProperties](limits.html#VkPhysicalDeviceDescriptorIndexingProperties), [VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT](limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesEXT), [VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV](limits.html#VkPhysicalDeviceDeviceGeneratedCommandsPropertiesNV), [VkPhysicalDeviceDiscardRectanglePropertiesEXT](limits.html#VkPhysicalDeviceDiscardRectanglePropertiesEXT), [VkPhysicalDeviceDisplacementMicromapPropertiesNV](limits.html#VkPhysicalDeviceDisplacementMicromapPropertiesNV), [VkPhysicalDeviceDriverProperties](#VkPhysicalDeviceDriverProperties), [VkPhysicalDeviceDrmPropertiesEXT](#VkPhysicalDeviceDrmPropertiesEXT), [VkPhysicalDeviceExtendedDynamicState3PropertiesEXT](limits.html#VkPhysicalDeviceExtendedDynamicState3PropertiesEXT), [VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV](limits.html#VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV), [VkPhysicalDeviceExternalComputeQueuePropertiesNV](VK_NV_external_compute_queue/VK_NV_external_compute_queue.html#VkPhysicalDeviceExternalComputeQueuePropertiesNV), [VkPhysicalDeviceExternalFormatResolvePropertiesANDROID](limits.html#VkPhysicalDeviceExternalFormatResolvePropertiesANDROID), [VkPhysicalDeviceExternalMemoryHostPropertiesEXT](limits.html#VkPhysicalDeviceExternalMemoryHostPropertiesEXT), [VkPhysicalDeviceFloatControlsProperties](limits.html#VkPhysicalDeviceFloatControlsProperties), [VkPhysicalDeviceFragmentDensityMap2PropertiesEXT](limits.html#VkPhysicalDeviceFragmentDensityMap2PropertiesEXT), [VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE](limits.html#VkPhysicalDeviceFragmentDensityMapLayeredPropertiesVALVE), [VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT](limits.html#VkPhysicalDeviceFragmentDensityMapOffsetPropertiesEXT), [VkPhysicalDeviceFragmentDensityMapPropertiesEXT](limits.html#VkPhysicalDeviceFragmentDensityMapPropertiesEXT), [VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR](limits.html#VkPhysicalDeviceFragmentShaderBarycentricPropertiesKHR), [VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV](limits.html#VkPhysicalDeviceFragmentShadingRateEnumsPropertiesNV), [VkPhysicalDeviceFragmentShadingRatePropertiesKHR](limits.html#VkPhysicalDeviceFragmentShadingRatePropertiesKHR), [VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT](limits.html#VkPhysicalDeviceGraphicsPipelineLibraryPropertiesEXT), [VkPhysicalDeviceHostImageCopyProperties](limits.html#VkPhysicalDeviceHostImageCopyProperties), [VkPhysicalDeviceIDProperties](#VkPhysicalDeviceIDProperties), [VkPhysicalDeviceImageAlignmentControlPropertiesMESA](limits.html#VkPhysicalDeviceImageAlignmentControlPropertiesMESA), [VkPhysicalDeviceImageProcessing2PropertiesQCOM](#VkPhysicalDeviceImageProcessing2PropertiesQCOM), [VkPhysicalDeviceImageProcessingPropertiesQCOM](#VkPhysicalDeviceImageProcessingPropertiesQCOM), [VkPhysicalDeviceInlineUniformBlockProperties](limits.html#VkPhysicalDeviceInlineUniformBlockProperties), [VkPhysicalDeviceLayeredApiPropertiesListKHR](limits.html#VkPhysicalDeviceLayeredApiPropertiesListKHR), [VkPhysicalDeviceLayeredDriverPropertiesMSFT](#VkPhysicalDeviceLayeredDriverPropertiesMSFT), [VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT](limits.html#VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT), [VkPhysicalDeviceLineRasterizationProperties](limits.html#VkPhysicalDeviceLineRasterizationProperties), [VkPhysicalDeviceMaintenance10PropertiesKHR](limits.html#VkPhysicalDeviceMaintenance10PropertiesKHR), [VkPhysicalDeviceMaintenance3Properties](limits.html#VkPhysicalDeviceMaintenance3Properties), [VkPhysicalDeviceMaintenance4Properties](limits.html#VkPhysicalDeviceMaintenance4Properties), [VkPhysicalDeviceMaintenance5Properties](limits.html#VkPhysicalDeviceMaintenance5Properties), [VkPhysicalDeviceMaintenance6Properties](limits.html#VkPhysicalDeviceMaintenance6Properties), [VkPhysicalDeviceMaintenance7PropertiesKHR](limits.html#VkPhysicalDeviceMaintenance7PropertiesKHR), [VkPhysicalDeviceMaintenance9PropertiesKHR](limits.html#VkPhysicalDeviceMaintenance9PropertiesKHR), [VkPhysicalDeviceMapMemoryPlacedPropertiesEXT](limits.html#VkPhysicalDeviceMapMemoryPlacedPropertiesEXT), [VkPhysicalDeviceMemoryDecompressionPropertiesEXT](limits.html#VkPhysicalDeviceMemoryDecompressionPropertiesEXT), [VkPhysicalDeviceMeshShaderPropertiesEXT](limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT), [VkPhysicalDeviceMeshShaderPropertiesNV](limits.html#VkPhysicalDeviceMeshShaderPropertiesNV), [VkPhysicalDeviceMultiDrawPropertiesEXT](limits.html#VkPhysicalDeviceMultiDrawPropertiesEXT), [VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX](limits.html#VkPhysicalDeviceMultiviewPerViewAttributesPropertiesNVX), [VkPhysicalDeviceMultiviewProperties](limits.html#VkPhysicalDeviceMultiviewProperties), [VkPhysicalDeviceNestedCommandBufferPropertiesEXT](limits.html#VkPhysicalDeviceNestedCommandBufferPropertiesEXT), [VkPhysicalDeviceOpacityMicromapPropertiesEXT](limits.html#VkPhysicalDeviceOpacityMicromapPropertiesEXT), [VkPhysicalDeviceOpticalFlowPropertiesNV](limits.html#VkPhysicalDeviceOpticalFlowPropertiesNV), [VkPhysicalDevicePCIBusInfoPropertiesEXT](#VkPhysicalDevicePCIBusInfoPropertiesEXT), [VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV](limits.html#VkPhysicalDevicePartitionedAccelerationStructurePropertiesNV), [VkPhysicalDevicePerformanceCountersByRegionPropertiesARM](limits.html#VkPhysicalDevicePerformanceCountersByRegionPropertiesARM), [VkPhysicalDevicePerformanceQueryPropertiesKHR](limits.html#VkPhysicalDevicePerformanceQueryPropertiesKHR), [VkPhysicalDevicePipelineBinaryPropertiesKHR](limits.html#VkPhysicalDevicePipelineBinaryPropertiesKHR), [VkPhysicalDevicePipelineRobustnessProperties](limits.html#VkPhysicalDevicePipelineRobustnessProperties), [VkPhysicalDevicePointClippingProperties](limits.html#VkPhysicalDevicePointClippingProperties), [VkPhysicalDevicePortabilitySubsetPropertiesKHR](limits.html#VkPhysicalDevicePortabilitySubsetPropertiesKHR), [VkPhysicalDeviceProtectedMemoryProperties](limits.html#VkPhysicalDeviceProtectedMemoryProperties), [VkPhysicalDeviceProvokingVertexPropertiesEXT](limits.html#VkPhysicalDeviceProvokingVertexPropertiesEXT), [VkPhysicalDevicePushConstantBankPropertiesNV](limits.html#VkPhysicalDevicePushConstantBankPropertiesNV), [VkPhysicalDevicePushDescriptorProperties](limits.html#VkPhysicalDevicePushDescriptorProperties), [VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT](limits.html#VkPhysicalDeviceRayTracingInvocationReorderPropertiesEXT), [VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV](limits.html#VkPhysicalDeviceRayTracingInvocationReorderPropertiesNV), [VkPhysicalDeviceRayTracingPipelinePropertiesKHR](limits.html#VkPhysicalDeviceRayTracingPipelinePropertiesKHR), [VkPhysicalDeviceRayTracingPropertiesNV](limits.html#VkPhysicalDeviceRayTracingPropertiesNV), [VkPhysicalDeviceRenderPassStripedPropertiesARM](limits.html#VkPhysicalDeviceRenderPassStripedPropertiesARM), [VkPhysicalDeviceRobustness2PropertiesKHR](limits.html#VkPhysicalDeviceRobustness2PropertiesKHR), [VkPhysicalDeviceSampleLocationsPropertiesEXT](limits.html#VkPhysicalDeviceSampleLocationsPropertiesEXT), [VkPhysicalDeviceSamplerFilterMinmaxProperties](limits.html#VkPhysicalDeviceSamplerFilterMinmaxProperties), [VkPhysicalDeviceSchedulingControlsPropertiesARM](#VkPhysicalDeviceSchedulingControlsPropertiesARM), [VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM](limits.html#VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM), [VkPhysicalDeviceShaderCoreProperties2AMD](limits.html#VkPhysicalDeviceShaderCoreProperties2AMD), [VkPhysicalDeviceShaderCorePropertiesAMD](limits.html#VkPhysicalDeviceShaderCorePropertiesAMD), [VkPhysicalDeviceShaderCorePropertiesARM](limits.html#VkPhysicalDeviceShaderCorePropertiesARM), [VkPhysicalDeviceShaderEnqueuePropertiesAMDX](limits.html#VkPhysicalDeviceShaderEnqueuePropertiesAMDX), [VkPhysicalDeviceShaderInstrumentationPropertiesARM](limits.html#VkPhysicalDeviceShaderInstrumentationPropertiesARM), [VkPhysicalDeviceShaderIntegerDotProductProperties](#VkPhysicalDeviceShaderIntegerDotProductProperties), [VkPhysicalDeviceShaderLongVectorPropertiesEXT](limits.html#VkPhysicalDeviceShaderLongVectorPropertiesEXT), [VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT](limits.html#VkPhysicalDeviceShaderModuleIdentifierPropertiesEXT), [VkPhysicalDeviceShaderObjectPropertiesEXT](limits.html#VkPhysicalDeviceShaderObjectPropertiesEXT), [VkPhysicalDeviceShaderSMBuiltinsPropertiesNV](limits.html#VkPhysicalDeviceShaderSMBuiltinsPropertiesNV), [VkPhysicalDeviceShaderTileImagePropertiesEXT](#VkPhysicalDeviceShaderTileImagePropertiesEXT), [VkPhysicalDeviceShadingRateImagePropertiesNV](limits.html#VkPhysicalDeviceShadingRateImagePropertiesNV), [VkPhysicalDeviceSubgroupProperties](limits.html#VkPhysicalDeviceSubgroupProperties), [VkPhysicalDeviceSubgroupSizeControlProperties](limits.html#VkPhysicalDeviceSubgroupSizeControlProperties), [VkPhysicalDeviceSubpassShadingPropertiesHUAWEI](limits.html#VkPhysicalDeviceSubpassShadingPropertiesHUAWEI), [VkPhysicalDeviceTensorPropertiesARM](limits.html#VkPhysicalDeviceTensorPropertiesARM), [VkPhysicalDeviceTexelBufferAlignmentProperties](limits.html#VkPhysicalDeviceTexelBufferAlignmentProperties), [VkPhysicalDeviceTileMemoryHeapPropertiesQCOM](limits.html#VkPhysicalDeviceTileMemoryHeapPropertiesQCOM), [VkPhysicalDeviceTileShadingPropertiesQCOM](limits.html#VkPhysicalDeviceTileShadingPropertiesQCOM), [VkPhysicalDeviceTimelineSemaphoreProperties](limits.html#VkPhysicalDeviceTimelineSemaphoreProperties), [VkPhysicalDeviceTransformFeedbackPropertiesEXT](limits.html#VkPhysicalDeviceTransformFeedbackPropertiesEXT), [VkPhysicalDeviceVertexAttributeDivisorProperties](limits.html#VkPhysicalDeviceVertexAttributeDivisorProperties), [VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT](limits.html#VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT), [VkPhysicalDeviceVulkan11Properties](#VkPhysicalDeviceVulkan11Properties), [VkPhysicalDeviceVulkan12Properties](#VkPhysicalDeviceVulkan12Properties), [VkPhysicalDeviceVulkan13Properties](#VkPhysicalDeviceVulkan13Properties), or [VkPhysicalDeviceVulkan14Properties](#VkPhysicalDeviceVulkan14Properties)

* 
[](#VUID-VkPhysicalDeviceProperties2-sType-unique) VUID-VkPhysicalDeviceProperties2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

The `VkPhysicalDeviceVulkan11Properties` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceVulkan11Properties {
    VkStructureType            sType;
    void*                      pNext;
    uint8_t                    deviceUUID[VK_UUID_SIZE];
    uint8_t                    driverUUID[VK_UUID_SIZE];
    uint8_t                    deviceLUID[VK_LUID_SIZE];
    uint32_t                   deviceNodeMask;
    VkBool32                   deviceLUIDValid;
    uint32_t                   subgroupSize;
    VkShaderStageFlags         subgroupSupportedStages;
    VkSubgroupFeatureFlags     subgroupSupportedOperations;
    VkBool32                   subgroupQuadOperationsInAllStages;
    VkPointClippingBehavior    pointClippingBehavior;
    uint32_t                   maxMultiviewViewCount;
    uint32_t                   maxMultiviewInstanceIndex;
    VkBool32                   protectedNoFault;
    uint32_t                   maxPerSetDescriptors;
    VkDeviceSize               maxMemoryAllocationSize;
} VkPhysicalDeviceVulkan11Properties;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceUUID` is an array of [VK_UUID_SIZE](#VK_UUID_SIZE) `uint8_t` values
representing a universally unique identifier for the device.

* 
`driverUUID` is an array of [VK_UUID_SIZE](#VK_UUID_SIZE) `uint8_t` values
representing a universally unique identifier for the driver build in use
by the device.

* 
`deviceLUID` is an array of [VK_LUID_SIZE](#VK_LUID_SIZE) `uint8_t` values
representing a locally unique identifier for the device.

* 
`deviceNodeMask` is a `uint32_t` bitfield identifying the node
within a linked device adapter corresponding to the device.

* 
`deviceLUIDValid` is a boolean value that will be [VK_TRUE](fundamentals.html#VK_TRUE) if
`deviceLUID` contains a valid LUID and `deviceNodeMask` contains
a valid node mask, and [VK_FALSE](fundamentals.html#VK_FALSE) if they do not.

* 
 `subgroupSize` is the default
number of invocations in each subgroup.
`subgroupSize` is at least 1 if any of the physical device’s queues
support [VK_QUEUE_GRAPHICS_BIT](#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](#VkQueueFlagBits).
`subgroupSize` is a power-of-two.

* 

`subgroupSupportedStages` is a bitfield of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits)
describing the shader stages that [group    operations](shaders.html#shaders-group-operations) with [subgroup scope](shaders.html#shaders-scope-subgroup) are
supported in.
`subgroupSupportedStages` will have the [VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits)
bit set if any of the physical device’s queues support
[VK_QUEUE_COMPUTE_BIT](#VkQueueFlagBits).

* 

`subgroupSupportedOperations` is a bitmask of
[VkSubgroupFeatureFlagBits](limits.html#VkSubgroupFeatureFlagBits) specifying the sets of
[group operations](shaders.html#shaders-group-operations) with
[subgroup scope](shaders.html#shaders-scope-subgroup) supported on this device.
`subgroupSupportedOperations` will have the
[VK_SUBGROUP_FEATURE_BASIC_BIT](limits.html#VkSubgroupFeatureFlagBits) bit set if any of the physical
device’s queues support [VK_QUEUE_GRAPHICS_BIT](#VkQueueFlagBits) or
[VK_QUEUE_COMPUTE_BIT](#VkQueueFlagBits).

* 

`subgroupQuadOperationsInAllStages` is a boolean specifying whether
[quad group operations](shaders.html#shaders-quad-operations) are available in all
stages, or are restricted to fragment and compute stages.

* 
 `pointClippingBehavior` is a
[VkPointClippingBehavior](vertexpostproc.html#VkPointClippingBehavior) value specifying the point clipping
behavior supported by the implementation.

* 

`maxMultiviewViewCount` is one greater than the maximum view index
that **can** be used in a subpass.

* 

`maxMultiviewInstanceIndex` is the maximum valid value of instance
index allowed to be generated by a drawing command recorded within a
subpass of a multiview render pass instance.

* 
 `protectedNoFault`
specifies how an implementation behaves when an application attempts to
write to unprotected memory in a protected queue operation, read from
protected memory in an unprotected queue operation, or perform a query
in a protected queue operation.
If this limit is [VK_TRUE](fundamentals.html#VK_TRUE), such writes will be discarded or have
**undefined** values written; reads and queries will return poison.
If this limit is [VK_FALSE](fundamentals.html#VK_FALSE), applications **must** not perform these
operations.
See [Protected Memory Access Rules](memory.html#memory-protected-access-rules) for more information.

* 

`maxPerSetDescriptors` is a maximum number of descriptors (summed
over all descriptor types) in a single descriptor set that is guaranteed
to satisfy any implementation-dependent constraints on the size of a
descriptor set itself.
Applications **can** query whether a descriptor set that goes beyond this
limit is supported using [vkGetDescriptorSetLayoutSupport](descriptorsets.html#vkGetDescriptorSetLayoutSupport).

* 

`maxMemoryAllocationSize` is the maximum size of a memory allocation
that **can** be created, even if there is more space available in the heap.
If [VkMemoryAllocateInfo](memory.html#VkMemoryAllocateInfo)::`allocationSize` is larger the error
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult) **may** be returned.

If the `VkPhysicalDeviceVulkan11Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These properties correspond to Vulkan 1.1 functionality.

The members of `VkPhysicalDeviceVulkan11Properties` have the same values
as the corresponding members of [VkPhysicalDeviceIDProperties](#VkPhysicalDeviceIDProperties),
[VkPhysicalDeviceSubgroupProperties](limits.html#VkPhysicalDeviceSubgroupProperties),
[VkPhysicalDevicePointClippingProperties](limits.html#VkPhysicalDevicePointClippingProperties),
[VkPhysicalDeviceMultiviewProperties](limits.html#VkPhysicalDeviceMultiviewProperties),
[VkPhysicalDeviceProtectedMemoryProperties](limits.html#VkPhysicalDeviceProtectedMemoryProperties), and
[VkPhysicalDeviceMaintenance3Properties](limits.html#VkPhysicalDeviceMaintenance3Properties).

|  | The `subgroupSupportedStages`, `subgroupSupportedOperations`, and
| --- | --- |
`subgroupQuadOperationsInAllStages` members of this structure correspond
respectively to the
[VkPhysicalDeviceSubgroupProperties](limits.html#VkPhysicalDeviceSubgroupProperties)::`supportedStages`,
[VkPhysicalDeviceSubgroupProperties](limits.html#VkPhysicalDeviceSubgroupProperties)::`supportedOperations`, and
[VkPhysicalDeviceSubgroupProperties](limits.html#VkPhysicalDeviceSubgroupProperties)::`quadOperationsInAllStages`
members, but add the `subgroup` prefix to the member name. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan11Properties-sType-sType) VUID-VkPhysicalDeviceVulkan11Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceVulkan12Properties` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceVulkan12Properties {
    VkStructureType                      sType;
    void*                                pNext;
    VkDriverId                           driverID;
    char                                 driverName[VK_MAX_DRIVER_NAME_SIZE];
    char                                 driverInfo[VK_MAX_DRIVER_INFO_SIZE];
    VkConformanceVersion                 conformanceVersion;
    VkShaderFloatControlsIndependence    denormBehaviorIndependence;
    VkShaderFloatControlsIndependence    roundingModeIndependence;
    VkBool32                             shaderSignedZeroInfNanPreserveFloat16;
    VkBool32                             shaderSignedZeroInfNanPreserveFloat32;
    VkBool32                             shaderSignedZeroInfNanPreserveFloat64;
    VkBool32                             shaderDenormPreserveFloat16;
    VkBool32                             shaderDenormPreserveFloat32;
    VkBool32                             shaderDenormPreserveFloat64;
    VkBool32                             shaderDenormFlushToZeroFloat16;
    VkBool32                             shaderDenormFlushToZeroFloat32;
    VkBool32                             shaderDenormFlushToZeroFloat64;
    VkBool32                             shaderRoundingModeRTEFloat16;
    VkBool32                             shaderRoundingModeRTEFloat32;
    VkBool32                             shaderRoundingModeRTEFloat64;
    VkBool32                             shaderRoundingModeRTZFloat16;
    VkBool32                             shaderRoundingModeRTZFloat32;
    VkBool32                             shaderRoundingModeRTZFloat64;
    uint32_t                             maxUpdateAfterBindDescriptorsInAllPools;
    VkBool32                             shaderUniformBufferArrayNonUniformIndexingNative;
    VkBool32                             shaderSampledImageArrayNonUniformIndexingNative;
    VkBool32                             shaderStorageBufferArrayNonUniformIndexingNative;
    VkBool32                             shaderStorageImageArrayNonUniformIndexingNative;
    VkBool32                             shaderInputAttachmentArrayNonUniformIndexingNative;
    VkBool32                             robustBufferAccessUpdateAfterBind;
    VkBool32                             quadDivergentImplicitLod;
    uint32_t                             maxPerStageDescriptorUpdateAfterBindSamplers;
    uint32_t                             maxPerStageDescriptorUpdateAfterBindUniformBuffers;
    uint32_t                             maxPerStageDescriptorUpdateAfterBindStorageBuffers;
    uint32_t                             maxPerStageDescriptorUpdateAfterBindSampledImages;
    uint32_t                             maxPerStageDescriptorUpdateAfterBindStorageImages;
    uint32_t                             maxPerStageDescriptorUpdateAfterBindInputAttachments;
    uint32_t                             maxPerStageUpdateAfterBindResources;
    uint32_t                             maxDescriptorSetUpdateAfterBindSamplers;
    uint32_t                             maxDescriptorSetUpdateAfterBindUniformBuffers;
    uint32_t                             maxDescriptorSetUpdateAfterBindUniformBuffersDynamic;
    uint32_t                             maxDescriptorSetUpdateAfterBindStorageBuffers;
    uint32_t                             maxDescriptorSetUpdateAfterBindStorageBuffersDynamic;
    uint32_t                             maxDescriptorSetUpdateAfterBindSampledImages;
    uint32_t                             maxDescriptorSetUpdateAfterBindStorageImages;
    uint32_t                             maxDescriptorSetUpdateAfterBindInputAttachments;
    VkResolveModeFlags                   supportedDepthResolveModes;
    VkResolveModeFlags                   supportedStencilResolveModes;
    VkBool32                             independentResolveNone;
    VkBool32                             independentResolve;
    VkBool32                             filterMinmaxSingleComponentFormats;
    VkBool32                             filterMinmaxImageComponentMapping;
    uint64_t                             maxTimelineSemaphoreValueDifference;
    VkSampleCountFlags                   framebufferIntegerColorSampleCounts;
} VkPhysicalDeviceVulkan12Properties;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`driverID` is a unique identifier for the driver of the physical
device.

* 
`driverName` is an array of [VK_MAX_DRIVER_NAME_SIZE](#VK_MAX_DRIVER_NAME_SIZE) `char`
containing a null-terminated UTF-8 string which is the name of the
driver.

* 
`driverInfo` is an array of [VK_MAX_DRIVER_INFO_SIZE](#VK_MAX_DRIVER_INFO_SIZE) `char`
containing a null-terminated UTF-8 string with additional information
about the driver.

* 
`conformanceVersion` is the latest version of the Vulkan conformance
test that the implementor has successfully tested this driver against
prior to release (see [VkConformanceVersion](#VkConformanceVersion)).

* 

`denormBehaviorIndependence` is a
[VkShaderFloatControlsIndependence](limits.html#VkShaderFloatControlsIndependence) value indicating whether, and
how, denorm behavior can be set independently for different bit widths.

* 

`roundingModeIndependence` is a
[VkShaderFloatControlsIndependence](limits.html#VkShaderFloatControlsIndependence) value indicating whether, and
how, rounding modes can be set independently for different bit widths.

* 

`shaderSignedZeroInfNanPreserveFloat16` is a boolean value
indicating whether sign of a zero, Nans and
   **can** be preserved in 16-bit floating-point
computations.
It also indicates whether the `SignedZeroInfNanPreserve` execution
mode **can** be used for 16-bit floating-point types.

* 

`shaderSignedZeroInfNanPreserveFloat32` is a boolean value
indicating whether sign of a zero, Nans and
   **can** be preserved in 32-bit floating-point
computations.
It also indicates whether the `SignedZeroInfNanPreserve` execution
mode **can** be used for 32-bit floating-point types.

* 

`shaderSignedZeroInfNanPreserveFloat64` is a boolean value
indicating whether sign of a zero, Nans and
   **can** be preserved in 64-bit floating-point
computations.
It also indicates whether the `SignedZeroInfNanPreserve` execution
mode **can** be used for 64-bit floating-point types.

* 

`shaderDenormPreserveFloat16` is a boolean value indicating whether
denormals **can** be preserved in 16-bit floating-point computations.
It also indicates whether the `DenormPreserve` execution mode **can** be
used for 16-bit floating-point types.

* 

`shaderDenormPreserveFloat32` is a boolean value indicating whether
denormals **can** be preserved in 32-bit floating-point computations.
It also indicates whether the `DenormPreserve` execution mode **can** be
used for 32-bit floating-point types.

* 

`shaderDenormPreserveFloat64` is a boolean value indicating whether
denormals **can** be preserved in 64-bit floating-point computations.
It also indicates whether the `DenormPreserve` execution mode **can** be
used for 64-bit floating-point types.

* 

`shaderDenormFlushToZeroFloat16` is a boolean value indicating
whether denormals **can** be flushed to zero in 16-bit floating-point
computations.
It also indicates whether the `DenormFlushToZero` execution mode **can**
be used for 16-bit floating-point types.

* 

`shaderDenormFlushToZeroFloat32` is a boolean value indicating
whether denormals **can** be flushed to zero in 32-bit floating-point
computations.
It also indicates whether the `DenormFlushToZero` execution mode **can**
be used for 32-bit floating-point types.

* 

`shaderDenormFlushToZeroFloat64` is a boolean value indicating
whether denormals **can** be flushed to zero in 64-bit floating-point
computations.
It also indicates whether the `DenormFlushToZero` execution mode **can**
be used for 64-bit floating-point types.

* 

`shaderRoundingModeRTEFloat16` is a boolean value indicating whether
an implementation supports the round-to-nearest-even rounding mode for
16-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTE` execution mode **can**
be used for 16-bit floating-point types.

* 

`shaderRoundingModeRTEFloat32` is a boolean value indicating whether
an implementation supports the round-to-nearest-even rounding mode for
32-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTE` execution mode **can**
be used for 32-bit floating-point types.

* 

`shaderRoundingModeRTEFloat64` is a boolean value indicating whether
an implementation supports the round-to-nearest-even rounding mode for
64-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTE` execution mode **can**
be used for 64-bit floating-point types.

* 

`shaderRoundingModeRTZFloat16` is a boolean value indicating whether
an implementation supports the round-towards-zero rounding mode for
16-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTZ` execution mode **can**
be used for 16-bit floating-point types.

* 

`shaderRoundingModeRTZFloat32` is a boolean value indicating whether
an implementation supports the round-towards-zero rounding mode for
32-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTZ` execution mode **can**
be used for 32-bit floating-point types.

* 

`shaderRoundingModeRTZFloat64` is a boolean value indicating whether
an implementation supports the round-towards-zero rounding mode for
64-bit floating-point arithmetic and conversion instructions.
It also indicates whether the `RoundingModeRTZ` execution mode **can**
be used for 64-bit floating-point types.

* 

`maxUpdateAfterBindDescriptorsInAllPools` is the maximum number of
descriptors (summed over all descriptor types) that **can** be created
across all pools that are created with the
[VK_DESCRIPTOR_POOL_CREATE_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorPoolCreateFlagBits) bit set.
Pool creation **may** fail when this limit is exceeded, or when the space
this limit represents is unable to satisfy a pool creation due to
fragmentation.

* 

`shaderUniformBufferArrayNonUniformIndexingNative` is a boolean
value indicating whether uniform buffer descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that non-uniformly indexes an array of uniform buffers **may**
execute multiple times in order to access all the descriptors.

* 

`shaderSampledImageArrayNonUniformIndexingNative` is a boolean value
indicating whether sampler and image descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that non-uniformly indexes an array of samplers or images
**may** execute multiple times in order to access all the descriptors.

* 

`shaderStorageBufferArrayNonUniformIndexingNative` is a boolean
value indicating whether storage buffer descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that non-uniformly indexes an array of storage buffers **may**
execute multiple times in order to access all the descriptors.

* 

`shaderStorageImageArrayNonUniformIndexingNative` is a boolean value
indicating whether storage image descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that non-uniformly indexes an array of storage images **may**
execute multiple times in order to access all the descriptors.

* 

`shaderInputAttachmentArrayNonUniformIndexingNative` is a boolean
value indicating whether input attachment descriptors natively support
non-uniform indexing.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then a single dynamic instance of an
instruction that non-uniformly indexes an array of input attachments
**may** execute multiple times in order to access all the descriptors.

* 

`robustBufferAccessUpdateAfterBind` is a boolean value indicating
whether [`robustBufferAccess`](features.html#features-robustBufferAccess) **can**
be enabled on a device simultaneously with
`descriptorBindingUniformBufferUpdateAfterBind`,
`descriptorBindingStorageBufferUpdateAfterBind`,
`descriptorBindingUniformTexelBufferUpdateAfterBind`, and/or
`descriptorBindingStorageTexelBufferUpdateAfterBind`.
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then either `robustBufferAccess` **must** be
disabled or all of these update-after-bind features **must** be disabled.
Similarly, if this property is [VK_FALSE](fundamentals.html#VK_FALSE), robustness **must** not be
enabled through the [VkPipelineRobustnessCreateInfo](pipelines.html#VkPipelineRobustnessCreateInfo) mechanism.

* 

`quadDivergentImplicitLod` is a boolean value indicating whether
implicit LOD calculations for image operations have well-defined results
when the image and/or sampler objects used for the instruction are not
uniform within a quad.
See [Derivative Image    Operations](textures.html#textures-derivative-image-operations).

* 

`maxPerStageDescriptorUpdateAfterBindSamplers` is similar to
`maxPerStageDescriptorSamplers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindUniformBuffers` is similar to
`maxPerStageDescriptorUniformBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindStorageBuffers` is similar to
`maxPerStageDescriptorStorageBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindSampledImages` is similar to
`maxPerStageDescriptorSampledImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindStorageImages` is similar to
`maxPerStageDescriptorStorageImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageDescriptorUpdateAfterBindInputAttachments` is similar to
`maxPerStageDescriptorInputAttachments` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxPerStageUpdateAfterBindResources` is similar to
`maxPerStageResources` but counts descriptors from descriptor sets
created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindSamplers` is similar to
`maxDescriptorSetSamplers` but counts descriptors from descriptor
sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindUniformBuffers` is similar to
`maxDescriptorSetUniformBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindUniformBuffersDynamic` is similar to
`maxDescriptorSetUniformBuffersDynamic` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.
While an application **can** allocate dynamic uniform buffer descriptors
from a pool created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits),
bindings for these descriptors **must** not be present in any descriptor
set layout that includes bindings created with
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT).

* 

`maxDescriptorSetUpdateAfterBindStorageBuffers` is similar to
`maxDescriptorSetStorageBuffers` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindStorageBuffersDynamic` is similar to
`maxDescriptorSetStorageBuffersDynamic` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.
While an application **can** allocate dynamic storage buffer descriptors
from a pool created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits),
bindings for these descriptors **must** not be present in any descriptor
set layout that includes bindings created with
[VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT).

* 

`maxDescriptorSetUpdateAfterBindSampledImages` is similar to
`maxDescriptorSetSampledImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindStorageImages` is similar to
`maxDescriptorSetStorageImages` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetUpdateAfterBindInputAttachments` is similar to
`maxDescriptorSetInputAttachments` but counts descriptors from
descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`supportedDepthResolveModes` is a bitmask of
[VkResolveModeFlagBits](renderpass.html#VkResolveModeFlagBits) indicating the set of supported depth
resolve modes.
[VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](renderpass.html#VkResolveModeFlagBitsKHR) **must** be included in the set but
implementations **may** support additional modes.

* 

`supportedStencilResolveModes` is a bitmask of
[VkResolveModeFlagBits](renderpass.html#VkResolveModeFlagBits) indicating the set of supported stencil
resolve modes.
[VK_RESOLVE_MODE_SAMPLE_ZERO_BIT](renderpass.html#VkResolveModeFlagBitsKHR) **must** be included in the set but
implementations **may** support additional modes.
[VK_RESOLVE_MODE_AVERAGE_BIT](renderpass.html#VkResolveModeFlagBitsKHR) **must** not be included in the set.

* 

`independentResolveNone` is [VK_TRUE](fundamentals.html#VK_TRUE) if the implementation
supports setting the depth and stencil resolve modes to different values
when one of those modes is [VK_RESOLVE_MODE_NONE](renderpass.html#VkResolveModeFlagBitsKHR).
Otherwise the implementation only supports setting both modes to the
same value.

* 
 `independentResolve`
is [VK_TRUE](fundamentals.html#VK_TRUE) if the implementation supports all combinations of the
supported depth and stencil resolve modes, including setting either
depth or stencil resolve mode to [VK_RESOLVE_MODE_NONE](renderpass.html#VkResolveModeFlagBitsKHR).
An implementation that supports `independentResolve` **must** also
support `independentResolveNone`.

* 

`filterMinmaxSingleComponentFormats` is a boolean value indicating
whether a minimum set of required formats support min/max filtering.

* 

`filterMinmaxImageComponentMapping` is a boolean value indicating
whether the implementation supports non-identity component mapping of
the image when doing min/max filtering.

* 

`maxTimelineSemaphoreValueDifference` indicates the maximum
difference allowed by the implementation between the current value of a
timeline semaphore and any pending signal or wait operations.

* 

`framebufferIntegerColorSampleCounts` is a bitmask of
[VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) indicating the color sample counts that are
supported for all framebuffer color attachments with integer formats.

If the `VkPhysicalDeviceVulkan12Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These properties correspond to Vulkan 1.2 functionality.

The members of `VkPhysicalDeviceVulkan12Properties` **must** have the same
values as the corresponding members of
[VkPhysicalDeviceDriverProperties](#VkPhysicalDeviceDriverProperties),
[VkPhysicalDeviceFloatControlsProperties](limits.html#VkPhysicalDeviceFloatControlsProperties),
[VkPhysicalDeviceDescriptorIndexingProperties](limits.html#VkPhysicalDeviceDescriptorIndexingProperties),
[VkPhysicalDeviceDepthStencilResolveProperties](limits.html#VkPhysicalDeviceDepthStencilResolveProperties),
[VkPhysicalDeviceSamplerFilterMinmaxProperties](limits.html#VkPhysicalDeviceSamplerFilterMinmaxProperties), and
[VkPhysicalDeviceTimelineSemaphoreProperties](limits.html#VkPhysicalDeviceTimelineSemaphoreProperties).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan12Properties-sType-sType) VUID-VkPhysicalDeviceVulkan12Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_2_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceVulkan13Properties` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceVulkan13Properties {
    VkStructureType       sType;
    void*                 pNext;
    uint32_t              minSubgroupSize;
    uint32_t              maxSubgroupSize;
    uint32_t              maxComputeWorkgroupSubgroups;
    VkShaderStageFlags    requiredSubgroupSizeStages;
    uint32_t              maxInlineUniformBlockSize;
    uint32_t              maxPerStageDescriptorInlineUniformBlocks;
    uint32_t              maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks;
    uint32_t              maxDescriptorSetInlineUniformBlocks;
    uint32_t              maxDescriptorSetUpdateAfterBindInlineUniformBlocks;
    uint32_t              maxInlineUniformTotalSize;
    VkBool32              integerDotProduct8BitUnsignedAccelerated;
    VkBool32              integerDotProduct8BitSignedAccelerated;
    VkBool32              integerDotProduct8BitMixedSignednessAccelerated;
    VkBool32              integerDotProduct4x8BitPackedUnsignedAccelerated;
    VkBool32              integerDotProduct4x8BitPackedSignedAccelerated;
    VkBool32              integerDotProduct4x8BitPackedMixedSignednessAccelerated;
    VkBool32              integerDotProduct16BitUnsignedAccelerated;
    VkBool32              integerDotProduct16BitSignedAccelerated;
    VkBool32              integerDotProduct16BitMixedSignednessAccelerated;
    VkBool32              integerDotProduct32BitUnsignedAccelerated;
    VkBool32              integerDotProduct32BitSignedAccelerated;
    VkBool32              integerDotProduct32BitMixedSignednessAccelerated;
    VkBool32              integerDotProduct64BitUnsignedAccelerated;
    VkBool32              integerDotProduct64BitSignedAccelerated;
    VkBool32              integerDotProduct64BitMixedSignednessAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating8BitUnsignedAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating8BitSignedAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating8BitMixedSignednessAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating4x8BitPackedUnsignedAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating4x8BitPackedSignedAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating4x8BitPackedMixedSignednessAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating16BitUnsignedAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating16BitSignedAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating16BitMixedSignednessAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating32BitUnsignedAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating32BitSignedAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating32BitMixedSignednessAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating64BitUnsignedAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating64BitSignedAccelerated;
    VkBool32              integerDotProductAccumulatingSaturating64BitMixedSignednessAccelerated;
    VkDeviceSize          storageTexelBufferOffsetAlignmentBytes;
    VkBool32              storageTexelBufferOffsetSingleTexelAlignment;
    VkDeviceSize          uniformTexelBufferOffsetAlignmentBytes;
    VkBool32              uniformTexelBufferOffsetSingleTexelAlignment;
    VkDeviceSize          maxBufferSize;
} VkPhysicalDeviceVulkan13Properties;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `minSubgroupSize` is the
minimum subgroup size supported by this device.
`minSubgroupSize` is at least one if any of the physical device’s
queues support [VK_QUEUE_GRAPHICS_BIT](#VkQueueFlagBits) or
[VK_QUEUE_COMPUTE_BIT](#VkQueueFlagBits).
`minSubgroupSize` is a power-of-two.
`minSubgroupSize` is less than or equal to `maxSubgroupSize`.
`minSubgroupSize` is less than or equal to [    `subgroupSize`](#limits-subgroupSize).

* 
 `maxSubgroupSize` is the
maximum subgroup size supported by this device.
`maxSubgroupSize` is at least one if any of the physical device’s
queues support [VK_QUEUE_GRAPHICS_BIT](#VkQueueFlagBits) or
[VK_QUEUE_COMPUTE_BIT](#VkQueueFlagBits).
`maxSubgroupSize` is a power-of-two.
`maxSubgroupSize` is greater than or equal to `minSubgroupSize`.
`maxSubgroupSize` is greater than or equal to [    `subgroupSize`](#limits-subgroupSize).

* 

`maxComputeWorkgroupSubgroups` is the maximum number of subgroups
supported by the implementation within a workgroup.

* 

`requiredSubgroupSizeStages` is a bitfield of what shader stages
support having a required subgroup size specified.

* 

`maxInlineUniformBlockSize` is the maximum size in bytes of an
[inline uniform block](descriptorsets.html#descriptors-inlineuniformblock) binding.

* 

`maxPerStageDescriptorInlineUniformBlocks` is the maximum number of
inline uniform block bindings that **can** be accessible to a single shader
stage in a pipeline layout.
Descriptor bindings with a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType) count against this limit.
Only descriptor bindings in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.

* 

`maxPerStageDescriptorUpdateAfterBindInlineUniformBlocks`
is similar to `maxPerStageDescriptorInlineUniformBlocks` but counts
descriptor bindings from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxDescriptorSetInlineUniformBlocks` is the maximum number of
inline uniform block bindings that **can** be included in descriptor
bindings in a pipeline layout across all pipeline shader stages and
descriptor set numbers.
Descriptor bindings with a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType) count against this limit.
Only descriptor bindings in descriptor set layouts created without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set
count against this limit.

* 

`maxDescriptorSetUpdateAfterBindInlineUniformBlocks`
is similar to `maxDescriptorSetInlineUniformBlocks` but counts
descriptor bindings from descriptor sets created with or without the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_UPDATE_AFTER_BIND_POOL_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit
set.

* 

`maxInlineUniformTotalSize` is the maximum total size in bytes of
all inline uniform block bindings, across all pipeline shader stages and
descriptor set numbers, that **can** be included in a pipeline layout.
Descriptor bindings with a descriptor type of
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptorsets.html#VkDescriptorType) count against this limit.

* 
`integerDotProduct8BitUnsignedAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit unsigned dot product operations
using the `OpUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct8BitSignedAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit signed dot product operations
using the `OpSDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct8BitMixedSignednessAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit mixed signedness dot
product operations using the `OpSUDotKHR` SPIR-V instruction is
accelerated [as defined    below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct4x8BitPackedUnsignedAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit unsigned dot product
operations from operands packed into 32-bit integers using the
`OpUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct4x8BitPackedSignedAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit signed dot product
operations from operands packed into 32-bit integers using the
`OpSDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct4x8BitPackedMixedSignednessAccelerated` is a
boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit mixed
signedness dot product operations from operands packed into 32-bit
integers using the `OpSUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct16BitUnsignedAccelerated` is a boolean that will
be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit unsigned dot product
operations using the `OpUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct16BitSignedAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit signed dot product operations
using the `OpSDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct16BitMixedSignednessAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit mixed signedness dot
product operations using the `OpSUDotKHR` SPIR-V instruction is
accelerated [as defined    below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct32BitUnsignedAccelerated` is a boolean that will
be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit unsigned dot product
operations using the `OpUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct32BitSignedAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit signed dot product operations
using the `OpSDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct32BitMixedSignednessAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit mixed signedness dot
product operations using the `OpSUDotKHR` SPIR-V instruction is
accelerated [as defined    below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct64BitUnsignedAccelerated` is a boolean that will
be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit unsigned dot product
operations using the `OpUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct64BitSignedAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit signed dot product operations
using the `OpSDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct64BitMixedSignednessAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit mixed signedness dot
product operations using the `OpSUDotKHR` SPIR-V instruction is
accelerated [as defined    below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating8BitUnsignedAccelerated` is
a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit unsigned
accumulating saturating dot product operations using the
`OpUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating8BitSignedAccelerated` is a
boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit signed
accumulating saturating dot product operations using the
`OpSDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating8BitMixedSignednessAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit mixed
signedness accumulating saturating dot product operations using the
`OpSUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating4x8BitPackedUnsignedAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit
unsigned accumulating saturating dot product operations from operands
packed into 32-bit integers using the `OpUDotAccSatKHR` SPIR-V
instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating4x8BitPackedSignedAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit signed
accumulating saturating dot product operations from operands packed into
32-bit integers using the `OpSDotAccSatKHR` SPIR-V instruction is
accelerated [as defined    below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating4x8BitPackedMixedSignednessAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit mixed
signedness accumulating saturating dot product operations from operands
packed into 32-bit integers using the `OpSUDotAccSatKHR` SPIR-V
instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating16BitUnsignedAccelerated` is
a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit unsigned
accumulating saturating dot product operations using the
`OpUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating16BitSignedAccelerated` is a
boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit signed
accumulating saturating dot product operations using the
`OpSDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating16BitMixedSignednessAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit mixed
signedness accumulating saturating dot product operations using the
`OpSUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating32BitUnsignedAccelerated` is
a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit unsigned
accumulating saturating dot product operations using the
`OpUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating32BitSignedAccelerated` is a
boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit signed
accumulating saturating dot product operations using the
`OpSDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating32BitMixedSignednessAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit mixed
signedness accumulating saturating dot product operations using the
`OpSUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating64BitUnsignedAccelerated` is
a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit unsigned
accumulating saturating dot product operations using the
`OpUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating64BitSignedAccelerated` is a
boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit signed
accumulating saturating dot product operations using the
`OpSDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating64BitMixedSignednessAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit mixed
signedness accumulating saturating dot product operations using the
`OpSUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 

`storageTexelBufferOffsetAlignmentBytes` is a byte alignment that is
sufficient for a storage texel buffer of any format.
The value **must** be a power of two.

* 

`storageTexelBufferOffsetSingleTexelAlignment` indicates whether
single texel alignment is sufficient for a storage texel buffer of any
format.

* 

`uniformTexelBufferOffsetAlignmentBytes` is a byte alignment that is
sufficient for a uniform texel buffer of any format.
The value **must** be a power of two.

* 

`uniformTexelBufferOffsetSingleTexelAlignment` indicates whether
single texel alignment is sufficient for a uniform texel buffer of any
format.

* 
 `maxBufferSize` is the
maximum size `VkBuffer` that **can** be created.

If the `VkPhysicalDeviceVulkan13Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These properties correspond to Vulkan 1.3 functionality.

The members of `VkPhysicalDeviceVulkan13Properties` **must** have the same
values as the corresponding members of
[VkPhysicalDeviceInlineUniformBlockProperties](limits.html#VkPhysicalDeviceInlineUniformBlockProperties) and
[VkPhysicalDeviceSubgroupSizeControlProperties](limits.html#VkPhysicalDeviceSubgroupSizeControlProperties).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan13Properties-sType-sType) VUID-VkPhysicalDeviceVulkan13Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceVulkan14Properties` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkPhysicalDeviceVulkan14Properties {
    VkStructureType                       sType;
    void*                                 pNext;
    uint32_t                              lineSubPixelPrecisionBits;
    uint32_t                              maxVertexAttribDivisor;
    VkBool32                              supportsNonZeroFirstInstance;
    uint32_t                              maxPushDescriptors;
    VkBool32                              dynamicRenderingLocalReadDepthStencilAttachments;
    VkBool32                              dynamicRenderingLocalReadMultisampledAttachments;
    VkBool32                              earlyFragmentMultisampleCoverageAfterSampleCounting;
    VkBool32                              earlyFragmentSampleMaskTestBeforeSampleCounting;
    VkBool32                              depthStencilSwizzleOneSupport;
    VkBool32                              polygonModePointSize;
    VkBool32                              nonStrictSinglePixelWideLinesUseParallelogram;
    VkBool32                              nonStrictWideLinesUseParallelogram;
    VkBool32                              blockTexelViewCompatibleMultipleLayers;
    uint32_t                              maxCombinedImageSamplerDescriptorCount;
    VkBool32                              fragmentShadingRateClampCombinerInputs;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessStorageBuffers;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessUniformBuffers;
    VkPipelineRobustnessBufferBehavior    defaultRobustnessVertexInputs;
    VkPipelineRobustnessImageBehavior     defaultRobustnessImages;
    uint32_t                              copySrcLayoutCount;
    VkImageLayout*                        pCopySrcLayouts;
    uint32_t                              copyDstLayoutCount;
    VkImageLayout*                        pCopyDstLayouts;
    uint8_t                               optimalTilingLayoutUUID[VK_UUID_SIZE];
    VkBool32                              identicalMemoryTypeRequirements;
} VkPhysicalDeviceVulkan14Properties;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 

`lineSubPixelPrecisionBits` is the number of bits of subpixel
precision in framebuffer coordinates xf and yf when
rasterizing [line segments](primsrast.html#primsrast-lines).

* 

`maxVertexAttribDivisor` is the maximum value of the number of
instances that will repeat the value of vertex attribute data when
instanced rendering is enabled.

* 

`supportsNonZeroFirstInstance` specifies whether a non-zero value
for the `firstInstance` parameter of [drawing commands](drawing.html#drawing)
is supported when
[VkVertexInputBindingDivisorDescription](fxvertex.html#VkVertexInputBindingDivisorDescription)::`divisor` is not `1`.

* 
 `maxPushDescriptors` is
the maximum number of descriptors that **can** be used in a descriptor set
layout created with
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) set.

* 

`dynamicRenderingLocalReadDepthStencilAttachments` is [VK_TRUE](fundamentals.html#VK_TRUE)
if the implementation supports local reads of depth/stencil attachments,
[VK_FALSE](fundamentals.html#VK_FALSE) otherwise.

* 

`dynamicRenderingLocalReadMultisampledAttachments` is [VK_TRUE](fundamentals.html#VK_TRUE)
if the implementation supports local reads of multisampled attachments,
[VK_FALSE](fundamentals.html#VK_FALSE) otherwise.

* 
`earlyFragmentMultisampleCoverageAfterSampleCounting` is a boolean
value indicating whether the [fragment shading](fragops.html#fragops-shader) and
[multisample coverage](fragops.html#fragops-covg) operations are performed after
[sample counting](fragops.html#fragops-samplecount) for [fragment    shaders](fragops.html#fragops-shader) with `EarlyFragmentTests` execution mode.

* 
`earlyFragmentSampleMaskTestBeforeSampleCounting` is a boolean value
indicating whether the [sample mask test](fragops.html#fragops-samplemask) operation
is performed before [sample counting](fragops.html#fragops-samplecount) for
[fragment shaders](fragops.html#fragops-shader) using the `EarlyFragmentTests`
execution mode.

* 
`depthStencilSwizzleOneSupport` is a boolean indicating that
depth/stencil texturing operations with [VK_COMPONENT_SWIZZLE_ONE](resources.html#VkComponentSwizzle)
have defined behavior.

* 
`polygonModePointSize` is a boolean value indicating whether the
point size of the final rasterization of polygons with
[VK_POLYGON_MODE_POINT](primsrast.html#VkPolygonMode) is controlled by `PointSize`.

* 
`nonStrictSinglePixelWideLinesUseParallelogram` is a boolean value
indicating whether non-strict lines with a width of 1.0 are rasterized
as parallelograms or using Bresenham’s algorithm.

* 
`nonStrictWideLinesUseParallelogram` is a boolean value indicating
whether non-strict lines with a width greater than 1.0 are rasterized as
parallelograms or using Bresenham’s algorithm.

* 
`blockTexelViewCompatibleMultipleLayers` is a boolean value
indicating that an implementation supports creating image views with
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) where the
`layerCount` member of `subresourceRange` is greater than `1`.

* 
`maxCombinedImageSamplerDescriptorCount` is the maximum number of
combined image sampler descriptors that the implementation uses to
access any of the [formats    that require a sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the
implementation.

* 
`fragmentShadingRateClampCombinerInputs` is a boolean value
indicating that an implementation clamps the inputs to
[combiner operations](primsrast.html#primsrast-fragment-shading-rate-combining).

* 
`defaultRobustnessStorageBuffers` describes the behavior of out of
bounds accesses made to storage buffers when no robustness features are
enabled

* 
`defaultRobustnessUniformBuffers` describes the behavior of out of
bounds accesses made to uniform buffers when no robustness features are
enabled

* 
`defaultRobustnessVertexInputs` describes the behavior of out of
bounds accesses made to vertex input attributes when no robustness
features are enabled

* 
`defaultRobustnessImages` describes the behavior of out of bounds
accesses made to images when no robustness features are enabled

* 
`copySrcLayoutCount` is an integer related to the number of image
layouts for host copies from images available or queried, as described
below.

* 
`pCopySrcLayouts` is a pointer to an array of [VkImageLayout](resources.html#VkImageLayout) in
which supported image layouts for use with host copy operations from
images are returned.

* 
`copyDstLayoutCount` is an integer related to the number of image
layouts for host copies to images available or queried, as described
below.

* 
`pCopyDstLayouts` is a pointer to an array of [VkImageLayout](resources.html#VkImageLayout) in
which supported image layouts for use with host copy operations to
images are returned.

* 
`optimalTilingLayoutUUID` is an array of [VK_UUID_SIZE](#VK_UUID_SIZE)
`uint8_t` values representing a universally unique identifier for the
implementation’s swizzling layout of images created with
[VK_IMAGE_TILING_OPTIMAL](resources.html#VkImageTiling).

* 
`identicalMemoryTypeRequirements` indicates that specifying the
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](resources.html#VkImageUsageFlagBits) flag in
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`usage` does not affect the memory type
requirements of the image.

If the `VkPhysicalDeviceVulkan14Properties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These properties correspond to Vulkan 1.4 functionality.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceVulkan14Properties-sType-sType) VUID-VkPhysicalDeviceVulkan14Properties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceIDProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceIDProperties {
    VkStructureType    sType;
    void*              pNext;
    uint8_t            deviceUUID[VK_UUID_SIZE];
    uint8_t            driverUUID[VK_UUID_SIZE];
    uint8_t            deviceLUID[VK_LUID_SIZE];
    uint32_t           deviceNodeMask;
    VkBool32           deviceLUIDValid;
} VkPhysicalDeviceIDProperties;

// Provided by VK_KHR_external_fence_capabilities, VK_KHR_external_memory_capabilities, VK_KHR_external_semaphore_capabilities
// Equivalent to VkPhysicalDeviceIDProperties
typedef VkPhysicalDeviceIDProperties VkPhysicalDeviceIDPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceUUID` is an array of [VK_UUID_SIZE](#VK_UUID_SIZE) `uint8_t` values
representing a universally unique identifier for the device.

* 
`driverUUID` is an array of [VK_UUID_SIZE](#VK_UUID_SIZE) `uint8_t` values
representing a universally unique identifier for the driver build in use
by the device.

* 
`deviceLUID` is an array of [VK_LUID_SIZE](#VK_LUID_SIZE) `uint8_t` values
representing a locally unique identifier for the device.

* 
`deviceNodeMask` is a `uint32_t` bitfield identifying the node
within a linked device adapter corresponding to the device.

* 
`deviceLUIDValid` is a boolean value that will be [VK_TRUE](fundamentals.html#VK_TRUE) if
`deviceLUID` contains a valid LUID and `deviceNodeMask` contains
a valid node mask, and [VK_FALSE](fundamentals.html#VK_FALSE) if they do not.

If the `VkPhysicalDeviceIDProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

`deviceUUID` **must** be immutable for a given device across instances,
processes, driver APIs, driver versions, and system reboots.

Applications **can** compare the `driverUUID` value across instance and
process boundaries, and **can** make similar queries in external APIs to
determine whether they are capable of sharing memory objects and resources
using them with the device.

`deviceUUID` and/or `driverUUID` **must** be used to determine whether
a particular external object can be shared between driver components, where
such a restriction exists as defined in the compatibility table for the
particular object type:

* 
[External memory handle    types compatibility](capabilities.html#external-memory-handle-types-compatibility)

* 
[External semaphore    handle types compatibility](capabilities.html#external-semaphore-handle-types-compatibility)

* 
[External fence handle types    compatibility](capabilities.html#external-fence-handle-types-compatibility)

If `deviceLUIDValid` is [VK_FALSE](fundamentals.html#VK_FALSE), the values of `deviceLUID`
and `deviceNodeMask` are **undefined**.
If `deviceLUIDValid` is [VK_TRUE](fundamentals.html#VK_TRUE) and Vulkan is running on the
Windows operating system, the contents of `deviceLUID` **can** be cast to
an `LUID` object and **must** be equal to the locally unique identifier of a
`IDXGIAdapter1` object that corresponds to `physicalDevice`.
If `deviceLUIDValid` is [VK_TRUE](fundamentals.html#VK_TRUE), `deviceNodeMask` **must**
contain exactly one bit.
If Vulkan is running on an operating system that supports the Direct3D 12
API and `physicalDevice` corresponds to an individual device in a linked
device adapter, `deviceNodeMask` identifies the Direct3D 12 node
corresponding to `physicalDevice`.
Otherwise, `deviceNodeMask` **must** be `1`.

|  | Although they have identical descriptions,
| --- | --- |
[VkPhysicalDeviceIDProperties](#VkPhysicalDeviceIDProperties)::`deviceUUID` may differ from
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)::`properties.pipelineCacheUUID`.
The former is intended to identify and correlate devices across API and
driver boundaries, while the latter is used to identify a compatible device
and driver combination to use when serializing and de-serializing pipeline
state.

Implementations **should** return `deviceUUID` values which are likely to
be unique even in the presence of multiple Vulkan implementations (such as a
GPU driver and a software renderer; two drivers for different GPUs; or the
same Vulkan driver running on two logically different devices).

Khronos' conformance testing is unable to guarantee that `deviceUUID`
values are actually unique, so implementors **should** make their own best
efforts to ensure this.
In particular, hard-coded `deviceUUID` values, especially all-`0` bits,
**should** never be used.

A combination of values unique to the vendor, the driver, and the hardware
environment can be used to provide a `deviceUUID` which is unique to a
high degree of certainty.
Some possible inputs to such a computation are:

* 
Information reported by [vkGetPhysicalDeviceProperties](#vkGetPhysicalDeviceProperties)

* 
PCI device ID (if defined)

* 
PCI bus ID, or similar system configuration information.

* 
Driver binary checksums. |

|  | While [VkPhysicalDeviceIDProperties](#VkPhysicalDeviceIDProperties)::`deviceUUID` is specified to
| --- | --- |
remain consistent across driver versions and system reboots, it is not
intended to be usable as a serializable persistent identifier for a device.
It may change when a device is physically added to, removed from, or moved
to a different connector in a system while that system is powered down.
Further, there is no reasonable way to verify with conformance testing that
a given device retains the same UUID in a given system across all driver
versions supported in that system.
While implementations should make every effort to report consistent device
UUIDs across driver versions, applications should avoid relying on the
persistence of this value for uses other than identifying compatible devices
for external object sharing purposes. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceIDProperties-sType-sType) VUID-VkPhysicalDeviceIDProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ID_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

[VK_UUID_SIZE](#VK_UUID_SIZE) is the length in `uint8_t` values of an array
containing a universally unique device or driver build identifier, as
returned in [VkPhysicalDeviceIDProperties](#VkPhysicalDeviceIDProperties)::`deviceUUID` and
[VkPhysicalDeviceIDProperties](#VkPhysicalDeviceIDProperties)::`driverUUID`.

#define VK_UUID_SIZE                      16U

[VK_LUID_SIZE](#VK_LUID_SIZE) is the length in `uint8_t` values of an array
containing a locally unique device identifier, as returned in
[VkPhysicalDeviceIDProperties](#VkPhysicalDeviceIDProperties)::`deviceLUID`.

#define VK_LUID_SIZE                      8U

#define VK_LUID_SIZE_KHR                  VK_LUID_SIZE

The `VkPhysicalDeviceDriverProperties` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkPhysicalDeviceDriverProperties {
    VkStructureType         sType;
    void*                   pNext;
    VkDriverId              driverID;
    char                    driverName[VK_MAX_DRIVER_NAME_SIZE];
    char                    driverInfo[VK_MAX_DRIVER_INFO_SIZE];
    VkConformanceVersion    conformanceVersion;
} VkPhysicalDeviceDriverProperties;

// Provided by VK_KHR_driver_properties
// Equivalent to VkPhysicalDeviceDriverProperties
typedef VkPhysicalDeviceDriverProperties VkPhysicalDeviceDriverPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`driverID` is a unique identifier for the driver of the physical
device.

* 
`driverName` is an array of [VK_MAX_DRIVER_NAME_SIZE](#VK_MAX_DRIVER_NAME_SIZE) `char`
containing a null-terminated UTF-8 string which is the name of the
driver.

* 
`driverInfo` is an array of [VK_MAX_DRIVER_INFO_SIZE](#VK_MAX_DRIVER_INFO_SIZE) `char`
containing a null-terminated UTF-8 string with additional information
about the driver.

* 
`conformanceVersion` is the latest version of the Vulkan conformance
test that the implementor has successfully tested this driver against
prior to release (see [VkConformanceVersion](#VkConformanceVersion)).

If the `VkPhysicalDeviceDriverProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These are properties of the driver corresponding to a physical device.

`driverID` **must** be immutable for a given driver across instances,
processes, driver versions, and system reboots.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDriverProperties-sType-sType) VUID-VkPhysicalDeviceDriverProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRIVER_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

Khronos driver IDs which **may** be returned in
[VkPhysicalDeviceDriverProperties](#VkPhysicalDeviceDriverProperties)::`driverID` are:

// Provided by VK_VERSION_1_2
typedef enum VkDriverId {
    VK_DRIVER_ID_AMD_PROPRIETARY = 1,
    VK_DRIVER_ID_AMD_OPEN_SOURCE = 2,
    VK_DRIVER_ID_MESA_RADV = 3,
    VK_DRIVER_ID_NVIDIA_PROPRIETARY = 4,
    VK_DRIVER_ID_INTEL_PROPRIETARY_WINDOWS = 5,
    VK_DRIVER_ID_INTEL_OPEN_SOURCE_MESA = 6,
    VK_DRIVER_ID_IMAGINATION_PROPRIETARY = 7,
    VK_DRIVER_ID_QUALCOMM_PROPRIETARY = 8,
    VK_DRIVER_ID_ARM_PROPRIETARY = 9,
    VK_DRIVER_ID_GOOGLE_SWIFTSHADER = 10,
    VK_DRIVER_ID_GGP_PROPRIETARY = 11,
    VK_DRIVER_ID_BROADCOM_PROPRIETARY = 12,
    VK_DRIVER_ID_MESA_LLVMPIPE = 13,
    VK_DRIVER_ID_MOLTENVK = 14,
    VK_DRIVER_ID_COREAVI_PROPRIETARY = 15,
    VK_DRIVER_ID_JUICE_PROPRIETARY = 16,
    VK_DRIVER_ID_VERISILICON_PROPRIETARY = 17,
    VK_DRIVER_ID_MESA_TURNIP = 18,
    VK_DRIVER_ID_MESA_V3DV = 19,
    VK_DRIVER_ID_MESA_PANVK = 20,
    VK_DRIVER_ID_SAMSUNG_PROPRIETARY = 21,
    VK_DRIVER_ID_MESA_VENUS = 22,
    VK_DRIVER_ID_MESA_DOZEN = 23,
    VK_DRIVER_ID_MESA_NVK = 24,
    VK_DRIVER_ID_IMAGINATION_OPEN_SOURCE_MESA = 25,
    VK_DRIVER_ID_MESA_HONEYKRISP = 26,
    VK_DRIVER_ID_VULKAN_SC_EMULATION_ON_VULKAN = 27,
    VK_DRIVER_ID_MESA_KOSMICKRISP = 28,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_AMD_PROPRIETARY_KHR = VK_DRIVER_ID_AMD_PROPRIETARY,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_AMD_OPEN_SOURCE_KHR = VK_DRIVER_ID_AMD_OPEN_SOURCE,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_MESA_RADV_KHR = VK_DRIVER_ID_MESA_RADV,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_NVIDIA_PROPRIETARY_KHR = VK_DRIVER_ID_NVIDIA_PROPRIETARY,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_INTEL_PROPRIETARY_WINDOWS_KHR = VK_DRIVER_ID_INTEL_PROPRIETARY_WINDOWS,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_INTEL_OPEN_SOURCE_MESA_KHR = VK_DRIVER_ID_INTEL_OPEN_SOURCE_MESA,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_IMAGINATION_PROPRIETARY_KHR = VK_DRIVER_ID_IMAGINATION_PROPRIETARY,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_QUALCOMM_PROPRIETARY_KHR = VK_DRIVER_ID_QUALCOMM_PROPRIETARY,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_ARM_PROPRIETARY_KHR = VK_DRIVER_ID_ARM_PROPRIETARY,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_GOOGLE_SWIFTSHADER_KHR = VK_DRIVER_ID_GOOGLE_SWIFTSHADER,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_GGP_PROPRIETARY_KHR = VK_DRIVER_ID_GGP_PROPRIETARY,
  // Provided by VK_KHR_driver_properties
    VK_DRIVER_ID_BROADCOM_PROPRIETARY_KHR = VK_DRIVER_ID_BROADCOM_PROPRIETARY,
} VkDriverId;

// Provided by VK_KHR_driver_properties
// Equivalent to VkDriverId
typedef VkDriverId VkDriverIdKHR;

|  | Khronos driver IDs may be allocated by vendors at any time.
| --- | --- |
There may be multiple driver IDs for the same vendor, representing different
drivers (for e.g. different platforms, proprietary or open source, etc.).
Only the latest canonical versions of this Specification, of the
corresponding `vk.xml` API Registry, and of the corresponding
`vulkan_core.h` header file **must** contain all reserved Khronos driver IDs.

Only driver IDs registered with Khronos are given symbolic names.
There **may** be unregistered driver IDs returned. |

[VK_MAX_DRIVER_NAME_SIZE](#VK_MAX_DRIVER_NAME_SIZE) is the length in `char` values of an array
containing a driver name string, as returned in
[VkPhysicalDeviceDriverProperties](#VkPhysicalDeviceDriverProperties)::`driverName`.

#define VK_MAX_DRIVER_NAME_SIZE           256U

#define VK_MAX_DRIVER_NAME_SIZE_KHR       VK_MAX_DRIVER_NAME_SIZE

[VK_MAX_DRIVER_INFO_SIZE](#VK_MAX_DRIVER_INFO_SIZE) is the length in `char` values of an array
containing a driver information string, as returned in
[VkPhysicalDeviceDriverProperties](#VkPhysicalDeviceDriverProperties)::`driverInfo`.

#define VK_MAX_DRIVER_INFO_SIZE           256U

#define VK_MAX_DRIVER_INFO_SIZE_KHR       VK_MAX_DRIVER_INFO_SIZE

The conformance test suite version an implementation is compliant with is
described with the `VkConformanceVersion` structure:

// Provided by VK_VERSION_1_2
typedef struct VkConformanceVersion {
    uint8_t    major;
    uint8_t    minor;
    uint8_t    subminor;
    uint8_t    patch;
} VkConformanceVersion;

// Provided by VK_KHR_driver_properties
// Equivalent to VkConformanceVersion
typedef VkConformanceVersion VkConformanceVersionKHR;

* 
`major` is the major version number of the conformance test suite.

* 
`minor` is the minor version number of the conformance test suite.

* 
`subminor` is the subminor version number of the conformance test
suite.

* 
`patch` is the patch version number of the conformance test suite.

The `VkPhysicalDevicePCIBusInfoPropertiesEXT` structure is defined as:

// Provided by VK_EXT_pci_bus_info
typedef struct VkPhysicalDevicePCIBusInfoPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           pciDomain;
    uint32_t           pciBus;
    uint32_t           pciDevice;
    uint32_t           pciFunction;
} VkPhysicalDevicePCIBusInfoPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pciDomain` is the PCI bus domain.

* 
`pciBus` is the PCI bus identifier.

* 
`pciDevice` is the PCI device identifier.

* 
`pciFunction` is the PCI device function identifier.

If the `VkPhysicalDevicePCIBusInfoPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These are properties of the PCI bus information of a physical device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDevicePCIBusInfoPropertiesEXT-sType-sType) VUID-VkPhysicalDevicePCIBusInfoPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PCI_BUS_INFO_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceDrmPropertiesEXT` structure is defined as:

// Provided by VK_EXT_physical_device_drm
typedef struct VkPhysicalDeviceDrmPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           hasPrimary;
    VkBool32           hasRender;
    int64_t            primaryMajor;
    int64_t            primaryMinor;
    int64_t            renderMajor;
    int64_t            renderMinor;
} VkPhysicalDeviceDrmPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`hasPrimary` is a boolean indicating whether the physical device has
a DRM primary node.

* 
`hasRender` is a boolean indicating whether the physical device has
a DRM render node.

* 
`primaryMajor` is the DRM primary node major number, if any.

* 
`primaryMinor` is the DRM primary node minor number, if any.

* 
`renderMajor` is the DRM render node major number, if any.

* 
`renderMinor` is the DRM render node minor number, if any.

If the `VkPhysicalDeviceDrmPropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These are properties of the DRM information of a physical device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceDrmPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceDrmPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRM_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderIntegerDotProductProperties` structure is
defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPhysicalDeviceShaderIntegerDotProductProperties {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           integerDotProduct8BitUnsignedAccelerated;
    VkBool32           integerDotProduct8BitSignedAccelerated;
    VkBool32           integerDotProduct8BitMixedSignednessAccelerated;
    VkBool32           integerDotProduct4x8BitPackedUnsignedAccelerated;
    VkBool32           integerDotProduct4x8BitPackedSignedAccelerated;
    VkBool32           integerDotProduct4x8BitPackedMixedSignednessAccelerated;
    VkBool32           integerDotProduct16BitUnsignedAccelerated;
    VkBool32           integerDotProduct16BitSignedAccelerated;
    VkBool32           integerDotProduct16BitMixedSignednessAccelerated;
    VkBool32           integerDotProduct32BitUnsignedAccelerated;
    VkBool32           integerDotProduct32BitSignedAccelerated;
    VkBool32           integerDotProduct32BitMixedSignednessAccelerated;
    VkBool32           integerDotProduct64BitUnsignedAccelerated;
    VkBool32           integerDotProduct64BitSignedAccelerated;
    VkBool32           integerDotProduct64BitMixedSignednessAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating8BitUnsignedAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating8BitSignedAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating8BitMixedSignednessAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating4x8BitPackedUnsignedAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating4x8BitPackedSignedAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating4x8BitPackedMixedSignednessAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating16BitUnsignedAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating16BitSignedAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating16BitMixedSignednessAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating32BitUnsignedAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating32BitSignedAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating32BitMixedSignednessAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating64BitUnsignedAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating64BitSignedAccelerated;
    VkBool32           integerDotProductAccumulatingSaturating64BitMixedSignednessAccelerated;
} VkPhysicalDeviceShaderIntegerDotProductProperties;

// Provided by VK_KHR_shader_integer_dot_product
// Equivalent to VkPhysicalDeviceShaderIntegerDotProductProperties
typedef VkPhysicalDeviceShaderIntegerDotProductProperties VkPhysicalDeviceShaderIntegerDotProductPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`integerDotProduct8BitUnsignedAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit unsigned dot product operations
using the `OpUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct8BitSignedAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit signed dot product operations
using the `OpSDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct8BitMixedSignednessAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit mixed signedness dot
product operations using the `OpSUDotKHR` SPIR-V instruction is
accelerated [as defined    below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct4x8BitPackedUnsignedAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit unsigned dot product
operations from operands packed into 32-bit integers using the
`OpUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct4x8BitPackedSignedAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit signed dot product
operations from operands packed into 32-bit integers using the
`OpSDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct4x8BitPackedMixedSignednessAccelerated` is a
boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit mixed
signedness dot product operations from operands packed into 32-bit
integers using the `OpSUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct16BitUnsignedAccelerated` is a boolean that will
be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit unsigned dot product
operations using the `OpUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct16BitSignedAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit signed dot product operations
using the `OpSDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct16BitMixedSignednessAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit mixed signedness dot
product operations using the `OpSUDotKHR` SPIR-V instruction is
accelerated [as defined    below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct32BitUnsignedAccelerated` is a boolean that will
be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit unsigned dot product
operations using the `OpUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct32BitSignedAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit signed dot product operations
using the `OpSDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct32BitMixedSignednessAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit mixed signedness dot
product operations using the `OpSUDotKHR` SPIR-V instruction is
accelerated [as defined    below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct64BitUnsignedAccelerated` is a boolean that will
be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit unsigned dot product
operations using the `OpUDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct64BitSignedAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit signed dot product operations
using the `OpSDotKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProduct64BitMixedSignednessAccelerated` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit mixed signedness dot
product operations using the `OpSUDotKHR` SPIR-V instruction is
accelerated [as defined    below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating8BitUnsignedAccelerated` is
a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit unsigned
accumulating saturating dot product operations using the
`OpUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating8BitSignedAccelerated` is a
boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit signed
accumulating saturating dot product operations using the
`OpSDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating8BitMixedSignednessAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit mixed
signedness accumulating saturating dot product operations using the
`OpSUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating4x8BitPackedUnsignedAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit
unsigned accumulating saturating dot product operations from operands
packed into 32-bit integers using the `OpUDotAccSatKHR` SPIR-V
instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating4x8BitPackedSignedAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit signed
accumulating saturating dot product operations from operands packed into
32-bit integers using the `OpSDotAccSatKHR` SPIR-V instruction is
accelerated [as defined    below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating4x8BitPackedMixedSignednessAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 8-bit mixed
signedness accumulating saturating dot product operations from operands
packed into 32-bit integers using the `OpSUDotAccSatKHR` SPIR-V
instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating16BitUnsignedAccelerated` is
a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit unsigned
accumulating saturating dot product operations using the
`OpUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating16BitSignedAccelerated` is a
boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit signed
accumulating saturating dot product operations using the
`OpSDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating16BitMixedSignednessAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 16-bit mixed
signedness accumulating saturating dot product operations using the
`OpSUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating32BitUnsignedAccelerated` is
a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit unsigned
accumulating saturating dot product operations using the
`OpUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating32BitSignedAccelerated` is a
boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit signed
accumulating saturating dot product operations using the
`OpSDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating32BitMixedSignednessAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 32-bit mixed
signedness accumulating saturating dot product operations using the
`OpSUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating64BitUnsignedAccelerated` is
a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit unsigned
accumulating saturating dot product operations using the
`OpUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating64BitSignedAccelerated` is a
boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit signed
accumulating saturating dot product operations using the
`OpSDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

* 
`integerDotProductAccumulatingSaturating64BitMixedSignednessAccelerated`
is a boolean that will be [VK_TRUE](fundamentals.html#VK_TRUE) if the support for 64-bit mixed
signedness accumulating saturating dot product operations using the
`OpSUDotAccSatKHR` SPIR-V instruction is accelerated
[as defined below](#devsandqueues-integer-dot-product-accelerated).

If the `VkPhysicalDeviceShaderIntegerDotProductProperties` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These are properties of the integer dot product acceleration information of
a physical device.

|  | A dot product operation is deemed accelerated if its implementation provides
| --- | --- |
a performance advantage over application-provided code composed from
elementary instructions and/or other dot product instructions, either
because the implementation uses optimized machine code sequences whose
generation from application-provided code cannot be guaranteed or because it
uses hardware features that cannot otherwise be targeted from
application-provided code. |

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderIntegerDotProductProperties-sType-sType) VUID-VkPhysicalDeviceShaderIntegerDotProductProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceImageProcessingPropertiesQCOM` structure is defined
as:

// Provided by VK_QCOM_image_processing
typedef struct VkPhysicalDeviceImageProcessingPropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxWeightFilterPhases;
    VkExtent2D         maxWeightFilterDimension;
    VkExtent2D         maxBlockMatchRegion;
    VkExtent2D         maxBoxFilterBlockSize;
} VkPhysicalDeviceImageProcessingPropertiesQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxWeightFilterPhases` is the
maximum value that **can** be specified for
[VkImageViewSampleWeightCreateInfoQCOM](resources.html#VkImageViewSampleWeightCreateInfoQCOM)::`numPhases` in
[weight image sampling](textures.html#textures-weightimage-filterphases) operations.

* 
 `maxWeightFilterDimension` is a
[VkExtent2D](fundamentals.html#VkExtent2D) describing the largest dimensions (`width` and
`height`) that **can** be specified for
[VkImageViewSampleWeightCreateInfoQCOM](resources.html#VkImageViewSampleWeightCreateInfoQCOM)::`filterSize`.

* 
 `maxBlockMatchRegion` is a
[VkExtent2D](fundamentals.html#VkExtent2D) describing the largest dimensions (`width` and
`height`) that **can** be specified for `blockSize` in
[block matching](textures.html#textures-blockmatch) operations.

* 
 `maxBoxFilterBlockSize` is a
[VkExtent2D](fundamentals.html#VkExtent2D) describing the maximum dimensions (`width` and
`height`) that **can** be specified for `blocksize` in
[box filter sampling](textures.html#textures-boxfilter) operations.

If the `VkPhysicalDeviceImageProcessingPropertiesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These are properties of the image processing information of a physical
device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageProcessingPropertiesQCOM-sType-sType) VUID-VkPhysicalDeviceImageProcessingPropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_PROPERTIES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceShaderTileImagePropertiesEXT` structure is defined
as:

// Provided by VK_EXT_shader_tile_image
typedef struct VkPhysicalDeviceShaderTileImagePropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderTileImageCoherentReadAccelerated;
    VkBool32           shaderTileImageReadSampleFromPixelRateInvocation;
    VkBool32           shaderTileImageReadFromHelperInvocation;
} VkPhysicalDeviceShaderTileImagePropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderTileImageCoherentReadAccelerated` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if coherent reads of tile image data is accelerated.

* 
`shaderTileImageReadSampleFromPixelRateInvocation` is a boolean that
will be [VK_TRUE](fundamentals.html#VK_TRUE) if reading from samples from a pixel rate fragment
invocation is supported when
[VkPipelineMultisampleStateCreateInfo](primsrast.html#VkPipelineMultisampleStateCreateInfo)::`rasterizationSamples` > 1.

* 
`shaderTileImageReadFromHelperInvocation` is a boolean that will be
[VK_TRUE](fundamentals.html#VK_TRUE) if reads of tile image data from helper fragment
invocations result in valid values.

If the `VkPhysicalDeviceShaderTileImagePropertiesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These are properties of the tile image information of a physical device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderTileImagePropertiesEXT-sType-sType) VUID-VkPhysicalDeviceShaderTileImagePropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TILE_IMAGE_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceImageProcessing2PropertiesQCOM` structure is
defined as:

// Provided by VK_QCOM_image_processing2
typedef struct VkPhysicalDeviceImageProcessing2PropertiesQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkExtent2D         maxBlockMatchWindow;
} VkPhysicalDeviceImageProcessing2PropertiesQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxBlockMatchWindow` is a
[VkExtent2D](fundamentals.html#VkExtent2D) describing the largest dimensions (`width` and
`height`) that **can** be specified for the block match window.

If the `VkPhysicalDeviceImageProcessing2PropertiesQCOM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

These are properties of the image processing2 information of a physical
device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceImageProcessing2PropertiesQCOM-sType-sType) VUID-VkPhysicalDeviceImageProcessing2PropertiesQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_2_PROPERTIES_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

The `VkPhysicalDeviceLayeredDriverPropertiesMSFT` structure is defined
as:

// Provided by VK_MSFT_layered_driver
typedef struct VkPhysicalDeviceLayeredDriverPropertiesMSFT {
    VkStructureType                     sType;
    void*                               pNext;
    VkLayeredDriverUnderlyingApiMSFT    underlyingAPI;
} VkPhysicalDeviceLayeredDriverPropertiesMSFT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`underlyingAPI` is a [VkLayeredDriverUnderlyingApiMSFT](#VkLayeredDriverUnderlyingApiMSFT) value
indicating which underlying API is used to implement the layered driver,
or [VK_LAYERED_DRIVER_UNDERLYING_API_NONE_MSFT](#VkLayeredDriverUnderlyingApiMSFT) if the driver is not
layered.

These are properties of the driver layering information of a physical
device.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceLayeredDriverPropertiesMSFT-sType-sType) VUID-VkPhysicalDeviceLayeredDriverPropertiesMSFT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_DRIVER_PROPERTIES_MSFT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

Underlying APIs which **may** be returned in
[VkPhysicalDeviceLayeredDriverPropertiesMSFT](#VkPhysicalDeviceLayeredDriverPropertiesMSFT)::`underlyingAPI` are:

// Provided by VK_MSFT_layered_driver
typedef enum VkLayeredDriverUnderlyingApiMSFT {
    VK_LAYERED_DRIVER_UNDERLYING_API_NONE_MSFT = 0,
    VK_LAYERED_DRIVER_UNDERLYING_API_D3D12_MSFT = 1,
} VkLayeredDriverUnderlyingApiMSFT;

The `VkPhysicalDeviceSchedulingControlsPropertiesARM` structure is
defined as:

// Provided by VK_ARM_scheduling_controls
typedef struct VkPhysicalDeviceSchedulingControlsPropertiesARM {
    VkStructureType                               sType;
    void*                                         pNext;
    VkPhysicalDeviceSchedulingControlsFlagsARM    schedulingControlsFlags;
} VkPhysicalDeviceSchedulingControlsPropertiesARM;

* 
`schedulingControlsFlags`
specifies the specific scheduling controls that a physical device
supports.

If the `VkPhysicalDeviceSchedulingControlsPropertiesARM` structure is included in the `pNext` chain of the
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2) structure passed to
[vkGetPhysicalDeviceProperties2](#vkGetPhysicalDeviceProperties2), it is filled in with each
corresponding implementation-dependent property.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSchedulingControlsPropertiesARM-sType-sType) VUID-VkPhysicalDeviceSchedulingControlsPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_PROPERTIES_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](#VkPhysicalDeviceProperties2)

Bits which **can** be set in
[VkPhysicalDeviceSchedulingControlsPropertiesARM](#VkPhysicalDeviceSchedulingControlsPropertiesARM)::`schedulingControlsFlags`,
specifying supported scheduling controls, are:

// Provided by VK_ARM_scheduling_controls
// Flag bits for VkPhysicalDeviceSchedulingControlsFlagBitsARM
typedef VkFlags64 VkPhysicalDeviceSchedulingControlsFlagBitsARM;
static const VkPhysicalDeviceSchedulingControlsFlagBitsARM VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_SHADER_CORE_COUNT_ARM = 0x00000001ULL;

* 
[VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_SHADER_CORE_COUNT_ARM](#VkPhysicalDeviceSchedulingControlsFlagBitsARM)
specifies that a [VkDeviceQueueShaderCoreControlCreateInfoARM](#VkDeviceQueueShaderCoreControlCreateInfoARM)
structure **may** be included in the `pNext` chain of a
[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) or [VkDeviceCreateInfo](#VkDeviceCreateInfo) structure.

// Provided by VK_ARM_scheduling_controls
typedef VkFlags64 VkPhysicalDeviceSchedulingControlsFlagsARM;

`VkPhysicalDeviceSchedulingControlsFlagsARM` is a bitmask type for
setting a mask of zero or more
[VkPhysicalDeviceSchedulingControlsFlagBitsARM](#VkPhysicalDeviceSchedulingControlsFlagBitsARM).

To query properties of queues available on a physical device, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceQueueFamilyProperties2](#vkGetPhysicalDeviceQueueFamilyProperties2). See [Legacy Functionality](../appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceQueueFamilyProperties(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pQueueFamilyPropertyCount,
    VkQueueFamilyProperties*                    pQueueFamilyProperties);

* 
`physicalDevice` is the handle to the physical device whose
properties will be queried.

* 
`pQueueFamilyPropertyCount` is a pointer to an integer related to
the number of queue families available or queried, as described below.

* 
`pQueueFamilyProperties` is either `NULL` or a pointer to an array
of [VkQueueFamilyProperties](#VkQueueFamilyProperties) structures.

If `pQueueFamilyProperties` is `NULL`, then the number of queue families
available is returned in `pQueueFamilyPropertyCount`.
Implementations **must** support at least one queue family.
Otherwise, `pQueueFamilyPropertyCount` **must** point to a variable set by
the application to the number of elements in the
`pQueueFamilyProperties` array, and on return the variable is
overwritten with the number of structures actually written to
`pQueueFamilyProperties`.
If `pQueueFamilyPropertyCount` is less than the number of queue families
available, at most `pQueueFamilyPropertyCount` structures will be
written.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyProperties-pQueueFamilyPropertyCount-parameter) VUID-vkGetPhysicalDeviceQueueFamilyProperties-pQueueFamilyPropertyCount-parameter

 `pQueueFamilyPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyProperties-pQueueFamilyProperties-parameter) VUID-vkGetPhysicalDeviceQueueFamilyProperties-pQueueFamilyProperties-parameter

 If the value referenced by `pQueueFamilyPropertyCount` is not `0`, and `pQueueFamilyProperties` is not `NULL`, `pQueueFamilyProperties` **must** be a valid pointer to an array of `pQueueFamilyPropertyCount` [VkQueueFamilyProperties](#VkQueueFamilyProperties) structures

The `VkQueueFamilyProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkQueueFamilyProperties {
    VkQueueFlags    queueFlags;
    uint32_t        queueCount;
    uint32_t        timestampValidBits;
    VkExtent3D      minImageTransferGranularity;
} VkQueueFamilyProperties;

* 
`queueFlags` is a bitmask of [VkQueueFlagBits](#VkQueueFlagBits) indicating
capabilities of the queues in this queue family.

* 
`queueCount` is the unsigned integer count of queues in this queue
family.
Each queue family **must** support at least one queue.

* 
`timestampValidBits` is the unsigned integer count of meaningful
bits in the timestamps written via
[vkCmdWriteTimestamp2](queries.html#vkCmdWriteTimestamp2) or
[vkCmdWriteTimestamp](queries.html#vkCmdWriteTimestamp).
The valid range for the count is 36 to 64 bits, or a value of 0,
indicating no support for timestamps.
Bits outside the valid range are guaranteed to be zeros.

* 
`minImageTransferGranularity` is the minimum granularity supported
for image transfer operations on the queues in this queue family.

The value returned in `minImageTransferGranularity` has a unit of
compressed texel blocks for images having a block-compressed format, and a
unit of texels otherwise.

Possible values of `minImageTransferGranularity` are:

* 
(0,0,0) specifies that only whole mip levels **must** be transferred
using the image transfer operations on the corresponding queues.
In this case, the following restrictions apply to all offset and extent
parameters of image transfer operations:

The `x`, `y`, and `z` members of a [VkOffset3D](fundamentals.html#VkOffset3D)
parameter **must** always be zero.

* 
The `width`, `height`, and `depth` members of a
[VkExtent3D](fundamentals.html#VkExtent3D) parameter **must** always match the width, height, and
depth of the image subresource corresponding to the parameter,
respectively.

(Ax, Ay, Az) where Ax, Ay, and Az
are all integer powers of two.
In this case the following restrictions apply to all image transfer
operations:

* 
`x`, `y`, and `z` of a [VkOffset3D](fundamentals.html#VkOffset3D) parameter **must** be
integer multiples of Ax, Ay, and Az,
respectively.

* 
`width` of a [VkExtent3D](fundamentals.html#VkExtent3D) parameter **must** be an integer
multiple of Ax, or else `x` +  `width` **must**
equal the width of the image subresource corresponding to the
parameter.

* 
`height` of a [VkExtent3D](fundamentals.html#VkExtent3D) parameter **must** be an integer
multiple of Ay, or else `y` +  `height` **must**
equal the height of the image subresource corresponding to the
parameter.

* 
`depth` of a [VkExtent3D](fundamentals.html#VkExtent3D) parameter **must** be an integer
multiple of Az, or else `z` +  `depth` **must**
equal the depth of the image subresource corresponding to the
parameter.

* 
If the format of the image corresponding to the parameters is one of
the block-compressed formats then for the purposes of the above
calculations the granularity **must** be scaled up by the compressed texel
block dimensions.

Queues supporting graphics and/or compute operations **must** report
(1,1,1) in `minImageTransferGranularity`, meaning that there are
no additional restrictions on the granularity of image transfer operations
for these queues.
Other queues supporting image transfer operations are only **required** to
support whole mip level transfers, thus `minImageTransferGranularity`
for queues belonging to such queue families **may** be (0,0,0).

The [Device Memory](memory.html#memory-device) section describes memory properties
queried from the physical device.

For physical device feature queries see the [Features](features.html#features) chapter.

Bits which **may** be set in [VkQueueFamilyProperties](#VkQueueFamilyProperties)::`queueFlags`,
indicating capabilities of queues in a queue family are:

// Provided by VK_VERSION_1_0
typedef enum VkQueueFlagBits {
    VK_QUEUE_GRAPHICS_BIT = 0x00000001,
    VK_QUEUE_COMPUTE_BIT = 0x00000002,
    VK_QUEUE_TRANSFER_BIT = 0x00000004,
    VK_QUEUE_SPARSE_BINDING_BIT = 0x00000008,
  // Provided by VK_VERSION_1_1
    VK_QUEUE_PROTECTED_BIT = 0x00000010,
  // Provided by VK_KHR_video_decode_queue
    VK_QUEUE_VIDEO_DECODE_BIT_KHR = 0x00000020,
  // Provided by VK_KHR_video_encode_queue
    VK_QUEUE_VIDEO_ENCODE_BIT_KHR = 0x00000040,
  // Provided by VK_NV_optical_flow
    VK_QUEUE_OPTICAL_FLOW_BIT_NV = 0x00000100,
  // Provided by VK_ARM_data_graph
    VK_QUEUE_DATA_GRAPH_BIT_ARM = 0x00000400,
} VkQueueFlagBits;

* 
[VK_QUEUE_GRAPHICS_BIT](#VkQueueFlagBits) specifies that queues in this queue family
support graphics operations.

* 
[VK_QUEUE_COMPUTE_BIT](#VkQueueFlagBits) specifies that queues in this queue family
support compute operations.

* 
[VK_QUEUE_TRANSFER_BIT](#VkQueueFlagBits) specifies that queues in this queue family
support transfer operations.

* 
[VK_QUEUE_SPARSE_BINDING_BIT](#VkQueueFlagBits) specifies that queues in this queue
family support sparse memory management operations (see
[Sparse Resources](sparsemem.html#sparsememory)).
If any of the sparse resource features are supported, then at least one
queue family **must** support this bit.

* 
[VK_QUEUE_VIDEO_DECODE_BIT_KHR](#VkQueueFlagBits) specifies that queues in this queue
family support [video decode operations](videocoding.html#video-decode-operations).

* 
[VK_QUEUE_VIDEO_ENCODE_BIT_KHR](#VkQueueFlagBits) specifies that queues in this queue
family support [video encode operations](videocoding.html#video-encode-operations).

* 
[VK_QUEUE_OPTICAL_FLOW_BIT_NV](#VkQueueFlagBits) specifies that queues in this queue
family support optical flow operations.

* 
[VK_QUEUE_DATA_GRAPH_BIT_ARM](#VkQueueFlagBits) specifies that queues in this queue
family support [data graph operations](VK_ARM_data_graph/graphs.html#graphs-operations).

* 
[VK_QUEUE_PROTECTED_BIT](#VkQueueFlagBits) specifies that queues in this queue family
support the [VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](#VkDeviceQueueCreateFlagBits) bit.
(see [Protected Memory](memory.html#memory-protected-memory)).
If the physical device supports the [    `protectedMemory`](features.html#features-protectedMemory) feature, at least one of its queue families
**must** support this bit.

At least one queue family of at least one physical device exposed by the
implementation **must** support at least one of the following sets of
operations:

* 
graphics operations

* 
compute operations

* 
video encode operations

* 
video decode operations

If an implementation exposes any queue family that supports graphics
operations, at least one queue family of at least one physical device
exposed by the implementation **must** support both graphics and compute
operations.

Furthermore, if the [`protectedMemory`](features.html#features-protectedMemory)
physical device feature is supported, then at least one queue family of at
least one physical device exposed by the implementation **must** support
graphics operations, compute operations, and protected memory operations.

|  | All commands that are allowed on a queue that supports transfer operations
| --- | --- |
are also allowed on a queue that supports either graphics or compute
operations.
Thus, if the capabilities of a queue family include
[VK_QUEUE_GRAPHICS_BIT](#VkQueueFlagBits) or [VK_QUEUE_COMPUTE_BIT](#VkQueueFlagBits), then reporting
the [VK_QUEUE_TRANSFER_BIT](#VkQueueFlagBits) capability separately for that queue family
is **optional**. |

For further details see [Queues](#devsandqueues-queues).

// Provided by VK_VERSION_1_0
typedef VkFlags VkQueueFlags;

`VkQueueFlags` is a bitmask type for setting a mask of zero or more
[VkQueueFlagBits](#VkQueueFlagBits).

To query properties of queues available on a physical device, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceQueueFamilyProperties2(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pQueueFamilyPropertyCount,
    VkQueueFamilyProperties2*                   pQueueFamilyProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceQueueFamilyProperties2
void vkGetPhysicalDeviceQueueFamilyProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pQueueFamilyPropertyCount,
    VkQueueFamilyProperties2*                   pQueueFamilyProperties);

* 
`physicalDevice` is the handle to the physical device whose
properties will be queried.

* 
`pQueueFamilyPropertyCount` is a pointer to an integer related to
the number of queue families available or queried, as described in
[vkGetPhysicalDeviceQueueFamilyProperties](#vkGetPhysicalDeviceQueueFamilyProperties).

* 
`pQueueFamilyProperties` is either `NULL` or a pointer to an array
of [VkQueueFamilyProperties2](#VkQueueFamilyProperties2) structures.

`vkGetPhysicalDeviceQueueFamilyProperties2` behaves similarly to
[vkGetPhysicalDeviceQueueFamilyProperties](#vkGetPhysicalDeviceQueueFamilyProperties), with the ability to return
extended information in a `pNext` chain of output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyProperties2-pQueueFamilyPropertyCount-parameter) VUID-vkGetPhysicalDeviceQueueFamilyProperties2-pQueueFamilyPropertyCount-parameter

 `pQueueFamilyPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyProperties2-pQueueFamilyProperties-parameter) VUID-vkGetPhysicalDeviceQueueFamilyProperties2-pQueueFamilyProperties-parameter

 If the value referenced by `pQueueFamilyPropertyCount` is not `0`, and `pQueueFamilyProperties` is not `NULL`, `pQueueFamilyProperties` **must** be a valid pointer to an array of `pQueueFamilyPropertyCount` [VkQueueFamilyProperties2](#VkQueueFamilyProperties2) structures

The `VkQueueFamilyProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkQueueFamilyProperties2 {
    VkStructureType            sType;
    void*                      pNext;
    VkQueueFamilyProperties    queueFamilyProperties;
} VkQueueFamilyProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkQueueFamilyProperties2
typedef VkQueueFamilyProperties2 VkQueueFamilyProperties2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queueFamilyProperties` is a [VkQueueFamilyProperties](#VkQueueFamilyProperties) structure
which is populated with the same values as in
[vkGetPhysicalDeviceQueueFamilyProperties](#vkGetPhysicalDeviceQueueFamilyProperties).

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyProperties2-sType-sType) VUID-VkQueueFamilyProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_PROPERTIES_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkQueueFamilyProperties2-pNext-pNext) VUID-VkQueueFamilyProperties2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkQueueFamilyCheckpointProperties2NV](#VkQueueFamilyCheckpointProperties2NV), [VkQueueFamilyCheckpointPropertiesNV](#VkQueueFamilyCheckpointPropertiesNV), [VkQueueFamilyGlobalPriorityProperties](#VkQueueFamilyGlobalPriorityProperties), [VkQueueFamilyOwnershipTransferPropertiesKHR](#VkQueueFamilyOwnershipTransferPropertiesKHR), [VkQueueFamilyQueryResultStatusPropertiesKHR](#VkQueueFamilyQueryResultStatusPropertiesKHR), or [VkQueueFamilyVideoPropertiesKHR](#VkQueueFamilyVideoPropertiesKHR)

* 
[](#VUID-VkQueueFamilyProperties2-sType-unique) VUID-VkQueueFamilyProperties2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

The [VkQueueFamilyGlobalPriorityProperties](#VkQueueFamilyGlobalPriorityProperties) structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkQueueFamilyGlobalPriorityProperties {
    VkStructureType          sType;
    void*                    pNext;
    uint32_t                 priorityCount;
    VkQueueGlobalPriority    priorities[VK_MAX_GLOBAL_PRIORITY_SIZE];
} VkQueueFamilyGlobalPriorityProperties;

// Provided by VK_KHR_global_priority
// Equivalent to VkQueueFamilyGlobalPriorityProperties
typedef VkQueueFamilyGlobalPriorityProperties VkQueueFamilyGlobalPriorityPropertiesKHR;

// Provided by VK_EXT_global_priority_query
// Equivalent to VkQueueFamilyGlobalPriorityProperties
typedef VkQueueFamilyGlobalPriorityProperties VkQueueFamilyGlobalPriorityPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`priorityCount` is the number of supported global queue priorities
in this queue family, and it **must** be greater than 0.

* 
`priorities` is an array of [VK_MAX_GLOBAL_PRIORITY_SIZE](#VK_MAX_GLOBAL_PRIORITY_SIZE)
[VkQueueGlobalPriority](#VkQueueGlobalPriority) enums representing all supported global
queue priorities in this queue family.
The first `priorityCount` elements of the array will be valid.

If the `VkQueueFamilyGlobalPriorityProperties` structure is included in
the `pNext` chain of the [VkQueueFamilyProperties2](#VkQueueFamilyProperties2) structure passed
to [vkGetPhysicalDeviceQueueFamilyProperties2](#vkGetPhysicalDeviceQueueFamilyProperties2), it is filled in with the
list of supported global queue priorities for the indicated family.

The valid elements of `priorities` **must** not contain any duplicate
values.

The valid elements of `priorities` **must** be a continuous sequence of
[VkQueueGlobalPriority](#VkQueueGlobalPriority) enums in ascending order.

|  | For example, returning `priorityCount` as 3 with supported
| --- | --- |
`priorities` as [VK_QUEUE_GLOBAL_PRIORITY_LOW](#VkQueueGlobalPriorityEXT),
[VK_QUEUE_GLOBAL_PRIORITY_MEDIUM](#VkQueueGlobalPriorityEXT) and
[VK_QUEUE_GLOBAL_PRIORITY_REALTIME](#VkQueueGlobalPriorityEXT) is not allowed. |

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyGlobalPriorityProperties-sType-sType) VUID-VkQueueFamilyGlobalPriorityProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2)

[VK_MAX_GLOBAL_PRIORITY_SIZE](#VK_MAX_GLOBAL_PRIORITY_SIZE) is the length of an array of
[VkQueueGlobalPriority](#VkQueueGlobalPriority) enumerants representing supported queue
priorities, as returned in
[VkQueueFamilyGlobalPriorityProperties](#VkQueueFamilyGlobalPriorityProperties)::`priorities`.

#define VK_MAX_GLOBAL_PRIORITY_SIZE       16U

#define VK_MAX_GLOBAL_PRIORITY_SIZE_KHR   VK_MAX_GLOBAL_PRIORITY_SIZE

#define VK_MAX_GLOBAL_PRIORITY_SIZE_EXT   VK_MAX_GLOBAL_PRIORITY_SIZE

The [VkQueueFamilyCheckpointProperties2NV](#VkQueueFamilyCheckpointProperties2NV) structure is defined as:

// Provided by VK_NV_device_diagnostic_checkpoints with VK_VERSION_1_3 or VK_KHR_synchronization2
typedef struct VkQueueFamilyCheckpointProperties2NV {
    VkStructureType          sType;
    void*                    pNext;
    VkPipelineStageFlags2    checkpointExecutionStageMask;
} VkQueueFamilyCheckpointProperties2NV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`checkpointExecutionStageMask` is a mask indicating which pipeline
stages the implementation can execute checkpoint markers in.

Additional queue family information can be queried by setting
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2)::`pNext` to point to a
`VkQueueFamilyCheckpointProperties2NV` structure.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyCheckpointProperties2NV-sType-sType) VUID-VkQueueFamilyCheckpointProperties2NV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_CHECKPOINT_PROPERTIES_2_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2)

The [VkQueueFamilyCheckpointPropertiesNV](#VkQueueFamilyCheckpointPropertiesNV) structure is defined as:

// Provided by VK_NV_device_diagnostic_checkpoints
typedef struct VkQueueFamilyCheckpointPropertiesNV {
    VkStructureType         sType;
    void*                   pNext;
    VkPipelineStageFlags    checkpointExecutionStageMask;
} VkQueueFamilyCheckpointPropertiesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`checkpointExecutionStageMask` is a mask indicating which pipeline
stages the implementation can execute checkpoint markers in.

Additional queue family information can be queried by setting
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2)::`pNext` to point to a
`VkQueueFamilyCheckpointPropertiesNV` structure.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyCheckpointPropertiesNV-sType-sType) VUID-VkQueueFamilyCheckpointPropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_CHECKPOINT_PROPERTIES_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2)

The [VkQueueFamilyVideoPropertiesKHR](#VkQueueFamilyVideoPropertiesKHR) structure is defined as:

// Provided by VK_KHR_video_queue
typedef struct VkQueueFamilyVideoPropertiesKHR {
    VkStructureType                  sType;
    void*                            pNext;
    VkVideoCodecOperationFlagsKHR    videoCodecOperations;
} VkQueueFamilyVideoPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`videoCodecOperations` is a bitmask of
[VkVideoCodecOperationFlagBitsKHR](videocoding.html#VkVideoCodecOperationFlagBitsKHR) that indicates the set of video
codec operations supported by the queue family.

If this structure is included in the `pNext` chain of the
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2) structure passed to
[vkGetPhysicalDeviceQueueFamilyProperties2](#vkGetPhysicalDeviceQueueFamilyProperties2), then it is filled with the
set of video codec operations supported by the specified queue family.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyVideoPropertiesKHR-sType-sType) VUID-VkQueueFamilyVideoPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_VIDEO_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2)

The [VkQueueFamilyQueryResultStatusPropertiesKHR](#VkQueueFamilyQueryResultStatusPropertiesKHR) structure is defined
as:

// Provided by VK_KHR_video_queue
typedef struct VkQueueFamilyQueryResultStatusPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           queryResultStatusSupport;
} VkQueueFamilyQueryResultStatusPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queryResultStatusSupport` reports [VK_TRUE](fundamentals.html#VK_TRUE) if query type
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](queries.html#VkQueryType) and use of
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](queries.html#VkQueryResultFlagBits) are supported.

If this structure is included in the `pNext` chain of the
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2) structure passed to
[vkGetPhysicalDeviceQueueFamilyProperties2](#vkGetPhysicalDeviceQueueFamilyProperties2), then it is filled with
information about whether [result status queries](queries.html#queries-result-status-only) are supported by the specified queue family.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyQueryResultStatusPropertiesKHR-sType-sType) VUID-VkQueueFamilyQueryResultStatusPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_QUERY_RESULT_STATUS_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2)

To enumerate the performance query counters available on a queue family of a
physical device, call:

// Provided by VK_KHR_performance_query
VkResult vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    uint32_t*                                   pCounterCount,
    VkPerformanceCounterKHR*                    pCounters,
    VkPerformanceCounterDescriptionKHR*         pCounterDescriptions);

* 
`physicalDevice` is the handle to the physical device whose queue
family performance query counter properties will be queried.

* 
`queueFamilyIndex` is the index into the queue family of the
physical device we want to get properties for.

* 
`pCounterCount` is a pointer to an integer related to the number of
counters available or queried, as described below.

* 
`pCounters` is either `NULL` or a pointer to an array of
[VkPerformanceCounterKHR](#VkPerformanceCounterKHR) structures.

* 
`pCounterDescriptions` is either `NULL` or a pointer to an array of
[VkPerformanceCounterDescriptionKHR](#VkPerformanceCounterDescriptionKHR) structures.

If `pCounters` is `NULL` and `pCounterDescriptions` is `NULL`, then
the number of counters available is returned in `pCounterCount`.
Otherwise, `pCounterCount` **must** point to a variable set by the
application to the number of elements in the `pCounters`,
`pCounterDescriptions`, or both arrays and on return the variable is
overwritten with the number of structures actually written out.
If `pCounterCount` is less than the number of counters available, at
most `pCounterCount` structures will be written, and [VK_INCOMPLETE](fundamentals.html#VkResult)
will be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the
available counters were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-physicalDevice-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](#VkPhysicalDevice) handle

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounterCount-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounterCount-parameter

 `pCounterCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounters-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounters-parameter

 If the value referenced by `pCounterCount` is not `0`, and `pCounters` is not `NULL`, `pCounters` **must** be a valid pointer to an array of `pCounterCount` [VkPerformanceCounterKHR](#VkPerformanceCounterKHR) structures

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounterDescriptions-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR-pCounterDescriptions-parameter

 If the value referenced by `pCounterCount` is not `0`, and `pCounterDescriptions` is not `NULL`, `pCounterDescriptions` **must** be a valid pointer to an array of `pCounterCount` [VkPerformanceCounterDescriptionKHR](#VkPerformanceCounterDescriptionKHR) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPerformanceCounterKHR` structure is defined as:

// Provided by VK_KHR_performance_query
typedef struct VkPerformanceCounterKHR {
    VkStructureType                   sType;
    void*                             pNext;
    VkPerformanceCounterUnitKHR       unit;
    VkPerformanceCounterScopeKHR      scope;
    VkPerformanceCounterStorageKHR    storage;
    uint8_t                           uuid[VK_UUID_SIZE];
} VkPerformanceCounterKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`unit` is a [VkPerformanceCounterUnitKHR](#VkPerformanceCounterUnitKHR) specifying the unit
that the counter data will record.

* 
`scope` is a [VkPerformanceCounterScopeKHR](#VkPerformanceCounterScopeKHR) specifying the scope
that the counter belongs to.

* 
`storage` is a [VkPerformanceCounterStorageKHR](#VkPerformanceCounterStorageKHR) specifying the
storage type that the counter’s data uses.

* 
`uuid` is an array of size [VK_UUID_SIZE](#VK_UUID_SIZE), containing 8-bit
values that represent a universally unique identifier for the counter of
the physical device.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceCounterKHR-sType-sType) VUID-VkPerformanceCounterKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPerformanceCounterKHR-pNext-pNext) VUID-VkPerformanceCounterKHR-pNext-pNext

 `pNext` **must** be `NULL`

Performance counters have an associated unit.
This unit describes how to interpret the performance counter result.

The performance counter unit types which **may** be returned in
[VkPerformanceCounterKHR](#VkPerformanceCounterKHR)::`unit` are:

// Provided by VK_KHR_performance_query
typedef enum VkPerformanceCounterUnitKHR {
    VK_PERFORMANCE_COUNTER_UNIT_GENERIC_KHR = 0,
    VK_PERFORMANCE_COUNTER_UNIT_PERCENTAGE_KHR = 1,
    VK_PERFORMANCE_COUNTER_UNIT_NANOSECONDS_KHR = 2,
    VK_PERFORMANCE_COUNTER_UNIT_BYTES_KHR = 3,
    VK_PERFORMANCE_COUNTER_UNIT_BYTES_PER_SECOND_KHR = 4,
    VK_PERFORMANCE_COUNTER_UNIT_KELVIN_KHR = 5,
    VK_PERFORMANCE_COUNTER_UNIT_WATTS_KHR = 6,
    VK_PERFORMANCE_COUNTER_UNIT_VOLTS_KHR = 7,
    VK_PERFORMANCE_COUNTER_UNIT_AMPS_KHR = 8,
    VK_PERFORMANCE_COUNTER_UNIT_HERTZ_KHR = 9,
    VK_PERFORMANCE_COUNTER_UNIT_CYCLES_KHR = 10,
} VkPerformanceCounterUnitKHR;

* 
[VK_PERFORMANCE_COUNTER_UNIT_GENERIC_KHR](#VkPerformanceCounterUnitKHR) - the performance counter
unit is a generic data point.

* 
[VK_PERFORMANCE_COUNTER_UNIT_PERCENTAGE_KHR](#VkPerformanceCounterUnitKHR) - the performance
counter unit is a percentage (%).

* 
[VK_PERFORMANCE_COUNTER_UNIT_NANOSECONDS_KHR](#VkPerformanceCounterUnitKHR) - the performance
counter unit is a value of nanoseconds (ns).

* 
[VK_PERFORMANCE_COUNTER_UNIT_BYTES_KHR](#VkPerformanceCounterUnitKHR) - the performance counter
unit is a value of bytes.

* 
[VK_PERFORMANCE_COUNTER_UNIT_BYTES_PER_SECOND_KHR](#VkPerformanceCounterUnitKHR) - the performance
counter unit is a value of bytes/s.

* 
[VK_PERFORMANCE_COUNTER_UNIT_KELVIN_KHR](#VkPerformanceCounterUnitKHR) - the performance counter
unit is a temperature reported in Kelvin.

* 
[VK_PERFORMANCE_COUNTER_UNIT_WATTS_KHR](#VkPerformanceCounterUnitKHR) - the performance counter
unit is a value of watts (W).

* 
[VK_PERFORMANCE_COUNTER_UNIT_VOLTS_KHR](#VkPerformanceCounterUnitKHR) - the performance counter
unit is a value of volts (V).

* 
[VK_PERFORMANCE_COUNTER_UNIT_AMPS_KHR](#VkPerformanceCounterUnitKHR) - the performance counter
unit is a value of amps (A).

* 
[VK_PERFORMANCE_COUNTER_UNIT_HERTZ_KHR](#VkPerformanceCounterUnitKHR) - the performance counter
unit is a value of hertz (Hz).

* 
[VK_PERFORMANCE_COUNTER_UNIT_CYCLES_KHR](#VkPerformanceCounterUnitKHR) - the performance counter
unit is a value of cycles.

Performance counters have an associated scope.
This scope describes the granularity of a performance counter.

The performance counter scope types which **may** be returned in
[VkPerformanceCounterKHR](#VkPerformanceCounterKHR)::`scope` are:

// Provided by VK_KHR_performance_query
typedef enum VkPerformanceCounterScopeKHR {
    VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR = 0,
    VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR = 1,
    VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_KHR = 2,
  // VK_QUERY_SCOPE_COMMAND_BUFFER_KHR is a legacy alias
    VK_QUERY_SCOPE_COMMAND_BUFFER_KHR = VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR,
  // VK_QUERY_SCOPE_RENDER_PASS_KHR is a legacy alias
    VK_QUERY_SCOPE_RENDER_PASS_KHR = VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR,
  // VK_QUERY_SCOPE_COMMAND_KHR is a legacy alias
    VK_QUERY_SCOPE_COMMAND_KHR = VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_KHR,
} VkPerformanceCounterScopeKHR;

* 
[VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR](#VkPerformanceCounterScopeKHR) - the performance
counter scope is a single complete command buffer.

* 
[VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR](#VkPerformanceCounterScopeKHR) - the performance
counter scope is zero or more complete render passes.
The performance query containing the performance counter **must** begin and
end outside a render pass instance.

* 
[VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_KHR](#VkPerformanceCounterScopeKHR) - the performance counter
scope is zero or more commands.

Performance counters have an associated storage.
This storage describes the payload of a counter result.

The performance counter storage types which **may** be returned in
[VkPerformanceCounterKHR](#VkPerformanceCounterKHR)::`storage` are:

// Provided by VK_KHR_performance_query
typedef enum VkPerformanceCounterStorageKHR {
    VK_PERFORMANCE_COUNTER_STORAGE_INT32_KHR = 0,
    VK_PERFORMANCE_COUNTER_STORAGE_INT64_KHR = 1,
    VK_PERFORMANCE_COUNTER_STORAGE_UINT32_KHR = 2,
    VK_PERFORMANCE_COUNTER_STORAGE_UINT64_KHR = 3,
    VK_PERFORMANCE_COUNTER_STORAGE_FLOAT32_KHR = 4,
    VK_PERFORMANCE_COUNTER_STORAGE_FLOAT64_KHR = 5,
} VkPerformanceCounterStorageKHR;

* 
[VK_PERFORMANCE_COUNTER_STORAGE_INT32_KHR](#VkPerformanceCounterStorageKHR) - the performance counter
storage is a 32-bit signed integer.

* 
[VK_PERFORMANCE_COUNTER_STORAGE_INT64_KHR](#VkPerformanceCounterStorageKHR) - the performance counter
storage is a 64-bit signed integer.

* 
[VK_PERFORMANCE_COUNTER_STORAGE_UINT32_KHR](#VkPerformanceCounterStorageKHR) - the performance
counter storage is a 32-bit unsigned integer.

* 
[VK_PERFORMANCE_COUNTER_STORAGE_UINT64_KHR](#VkPerformanceCounterStorageKHR) - the performance
counter storage is a 64-bit unsigned integer.

* 
[VK_PERFORMANCE_COUNTER_STORAGE_FLOAT32_KHR](#VkPerformanceCounterStorageKHR) - the performance
counter storage is a 32-bit floating-point.

* 
[VK_PERFORMANCE_COUNTER_STORAGE_FLOAT64_KHR](#VkPerformanceCounterStorageKHR) - the performance
counter storage is a 64-bit floating-point.

The `VkPerformanceCounterDescriptionKHR` structure is defined as:

// Provided by VK_KHR_performance_query
typedef struct VkPerformanceCounterDescriptionKHR {
    VkStructureType                            sType;
    void*                                      pNext;
    VkPerformanceCounterDescriptionFlagsKHR    flags;
    char                                       name[VK_MAX_DESCRIPTION_SIZE];
    char                                       category[VK_MAX_DESCRIPTION_SIZE];
    char                                       description[VK_MAX_DESCRIPTION_SIZE];
} VkPerformanceCounterDescriptionKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkPerformanceCounterDescriptionFlagBitsKHR](#VkPerformanceCounterDescriptionFlagBitsKHR) indicating the usage
behavior for the counter.

* 
`name` is an array of size [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE), containing
a null-terminated UTF-8 string specifying the name of the counter.

* 
`category` is an array of size [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE),
containing a null-terminated UTF-8 string specifying the category of the
counter.

* 
`description` is an array of size [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE),
containing a null-terminated UTF-8 string specifying the description of
the counter.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceCounterDescriptionKHR-sType-sType) VUID-VkPerformanceCounterDescriptionKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_DESCRIPTION_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPerformanceCounterDescriptionKHR-pNext-pNext) VUID-VkPerformanceCounterDescriptionKHR-pNext-pNext

 `pNext` **must** be `NULL`

Bits which **can** be set in
[VkPerformanceCounterDescriptionKHR](#VkPerformanceCounterDescriptionKHR)::`flags`, specifying usage
behavior of a performance counter, are:

// Provided by VK_KHR_performance_query
typedef enum VkPerformanceCounterDescriptionFlagBitsKHR {
    VK_PERFORMANCE_COUNTER_DESCRIPTION_PERFORMANCE_IMPACTING_BIT_KHR = 0x00000001,
    VK_PERFORMANCE_COUNTER_DESCRIPTION_CONCURRENTLY_IMPACTED_BIT_KHR = 0x00000002,
  // VK_PERFORMANCE_COUNTER_DESCRIPTION_PERFORMANCE_IMPACTING_KHR is a legacy alias
    VK_PERFORMANCE_COUNTER_DESCRIPTION_PERFORMANCE_IMPACTING_KHR = VK_PERFORMANCE_COUNTER_DESCRIPTION_PERFORMANCE_IMPACTING_BIT_KHR,
  // VK_PERFORMANCE_COUNTER_DESCRIPTION_CONCURRENTLY_IMPACTED_KHR is a legacy alias
    VK_PERFORMANCE_COUNTER_DESCRIPTION_CONCURRENTLY_IMPACTED_KHR = VK_PERFORMANCE_COUNTER_DESCRIPTION_CONCURRENTLY_IMPACTED_BIT_KHR,
} VkPerformanceCounterDescriptionFlagBitsKHR;

* 
[VK_PERFORMANCE_COUNTER_DESCRIPTION_PERFORMANCE_IMPACTING_BIT_KHR](#VkPerformanceCounterDescriptionFlagBitsKHR)
specifies that recording the counter **may** have a noticeable performance
impact.

* 
[VK_PERFORMANCE_COUNTER_DESCRIPTION_CONCURRENTLY_IMPACTED_BIT_KHR](#VkPerformanceCounterDescriptionFlagBitsKHR)
specifies that concurrently recording the counter while other submitted
command buffers are running **may** impact the accuracy of the recording.

// Provided by VK_KHR_performance_query
typedef VkFlags VkPerformanceCounterDescriptionFlagsKHR;

[VkPerformanceCounterDescriptionFlagsKHR](#VkPerformanceCounterDescriptionFlagsKHR) is a bitmask type for setting
a mask of zero or more [VkPerformanceCounterDescriptionFlagBitsKHR](#VkPerformanceCounterDescriptionFlagBitsKHR).

The [VkQueueFamilyOwnershipTransferPropertiesKHR](#VkQueueFamilyOwnershipTransferPropertiesKHR) structure is defined
as:

// Provided by VK_KHR_maintenance9
typedef struct VkQueueFamilyOwnershipTransferPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           optimalImageTransferToQueueFamilies;
} VkQueueFamilyOwnershipTransferPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`optimalImageTransferToQueueFamilies` is a bitmask of queue family
indices that indicates which queue families belonging to the same
logical device support implicitly acquiring optimal image resources
owned by this queue family, without the resources' contents becoming
**undefined**.

If this structure is included in the `pNext` chain of the
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2) structure passed to
[vkGetPhysicalDeviceQueueFamilyProperties2](#vkGetPhysicalDeviceQueueFamilyProperties2), then it is filled with the
queue family ownership properties for the specified queue family.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyOwnershipTransferPropertiesKHR-sType-sType) VUID-VkQueueFamilyOwnershipTransferPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_OWNERSHIP_TRANSFER_PROPERTIES_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueueFamilyProperties2](#VkQueueFamilyProperties2)

To enumerate the by region performance counters available on a queue family
of a physical device, call:

// Provided by VK_ARM_performance_counters_by_region
VkResult vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    uint32_t*                                   pCounterCount,
    VkPerformanceCounterARM*                    pCounters,
    VkPerformanceCounterDescriptionARM*         pCounterDescriptions);

* 
`physicalDevice` is the handle to the physical device whose queue
family by region performance counter properties will be queried.

* 
`queueFamilyIndex` is the index into the queue family of the
physical device we want to get properties for.

* 
`pCounterCount` is a pointer to an integer related to the number of
counters available or queried, as described below.

* 
`pCounters` is either `NULL` or a pointer to an array of
[VkPerformanceCounterARM](#VkPerformanceCounterARM) structures.

* 
`pCounterDescriptions` is either `NULL` or a pointer to an array of
[VkPerformanceCounterDescriptionARM](#VkPerformanceCounterDescriptionARM) structures.

If `pCounters` is `NULL` and `pCounterDescriptions` is `NULL`, then
the number of counters available is returned in `pCounterCount`.
Otherwise, `pCounterCount` **must** point to a variable set by the
application to the number of elements in the `pCounters`,
`pCounterDescriptions`, or both arrays and on return the variable is
overwritten with the number of structures actually written out.
If `pCounterCount` is less than the number of counters available, at
most `pCounterCount` structures will be written, and [VK_INCOMPLETE](fundamentals.html#VkResult)
will be returned instead of [VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the
available counters were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM-physicalDevice-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](#VkPhysicalDevice) handle

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM-pCounterCount-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM-pCounterCount-parameter

 `pCounterCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM-pCounters-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM-pCounters-parameter

 If the value referenced by `pCounterCount` is not `0`, and `pCounters` is not `NULL`, `pCounters` **must** be a valid pointer to an array of `pCounterCount` [VkPerformanceCounterARM](#VkPerformanceCounterARM) structures

* 
[](#VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM-pCounterDescriptions-parameter) VUID-vkEnumeratePhysicalDeviceQueueFamilyPerformanceCountersByRegionARM-pCounterDescriptions-parameter

 If the value referenced by `pCounterCount` is not `0`, and `pCounterDescriptions` is not `NULL`, `pCounterDescriptions` **must** be a valid pointer to an array of `pCounterCount` [VkPerformanceCounterDescriptionARM](#VkPerformanceCounterDescriptionARM) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPerformanceCounterARM` structure is defined as:

// Provided by VK_ARM_performance_counters_by_region
typedef struct VkPerformanceCounterARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           counterID;
} VkPerformanceCounterARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`counterID` is an identifier for the counter of the physical device.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceCounterARM-sType-sType) VUID-VkPerformanceCounterARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPerformanceCounterARM-pNext-pNext) VUID-VkPerformanceCounterARM-pNext-pNext

 `pNext` **must** be `NULL`

The `VkPerformanceCounterDescriptionARM` structure is defined as:

// Provided by VK_ARM_performance_counters_by_region
typedef struct VkPerformanceCounterDescriptionARM {
    VkStructureType                            sType;
    void*                                      pNext;
    VkPerformanceCounterDescriptionFlagsARM    flags;
    char                                       name[VK_MAX_DESCRIPTION_SIZE];
} VkPerformanceCounterDescriptionARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`name` is an array of size [VK_MAX_DESCRIPTION_SIZE](extensions.html#VK_MAX_DESCRIPTION_SIZE), containing
a null-terminated UTF-8 string specifying the name of the counter.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceCounterDescriptionARM-sType-sType) VUID-VkPerformanceCounterDescriptionARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_DESCRIPTION_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPerformanceCounterDescriptionARM-pNext-pNext) VUID-VkPerformanceCounterDescriptionARM-pNext-pNext

 `pNext` **must** be `NULL`

// Provided by VK_ARM_performance_counters_by_region
typedef VkFlags VkPerformanceCounterDescriptionFlagsARM;

`VkPerformanceCounterDescriptionFlagsARM` is a bitmask type for setting
a mask, but is currently reserved for future use.

Device objects represent logical connections to physical devices.
Each device exposes a number of *queue families* each having one or more
*queues*.
All queues in a queue family support the same operations.

As described in [Physical Devices](#devsandqueues-physical-device-enumeration), a Vulkan application will first query for all physical devices in
a system.
Each physical device **can** then be queried for its capabilities, including
its queue and queue family properties.
Once an acceptable physical device is identified, an application will create
a corresponding logical device.
The created logical device is then the primary interface to the physical
device.

How to enumerate the physical devices in a system and query those physical
devices for their queue family properties is described in the
[Physical Device Enumeration](#devsandqueues-physical-device-enumeration)
section above.

A single logical device **can** be created from multiple physical devices, if
those physical devices belong to the same device group.
A *device group* is a set of physical devices that support accessing each
other’s memory and recording a single command buffer that **can** be executed
on all the physical devices.
Device groups are enumerated by calling
[vkEnumeratePhysicalDeviceGroups](#vkEnumeratePhysicalDeviceGroups), and a logical device is created from
a subset of the physical devices in a device group by passing the physical
devices through [VkDeviceGroupDeviceCreateInfo](#VkDeviceGroupDeviceCreateInfo).
For two physical devices to be in the same device group, they **must** support
identical extensions, features, and properties.

|  | Physical devices in the same device group **must** be so similar because there
| --- | --- |
are no rules for how different features/properties would interact.
They **must** return the same values for nearly every invariant
`vkGetPhysicalDevice*` feature, property, capability, etc., but could
potentially differ for certain queries based on things like having a
different display connected, or a different compositor.
The specification does not attempt to enumerate which state is in each
category, because such a list would quickly become out of date. |

To retrieve a list of the device groups present in the system, call:

// Provided by VK_VERSION_1_1
VkResult vkEnumeratePhysicalDeviceGroups(
    VkInstance                                  instance,
    uint32_t*                                   pPhysicalDeviceGroupCount,
    VkPhysicalDeviceGroupProperties*            pPhysicalDeviceGroupProperties);

// Provided by VK_KHR_device_group_creation
// Equivalent to vkEnumeratePhysicalDeviceGroups
VkResult vkEnumeratePhysicalDeviceGroupsKHR(
    VkInstance                                  instance,
    uint32_t*                                   pPhysicalDeviceGroupCount,
    VkPhysicalDeviceGroupProperties*            pPhysicalDeviceGroupProperties);

* 
`instance` is a handle to a Vulkan instance previously created with
[vkCreateInstance](initialization.html#vkCreateInstance).

* 
`pPhysicalDeviceGroupCount` is a pointer to an integer related to
the number of device groups available or queried, as described below.

* 
`pPhysicalDeviceGroupProperties` is either `NULL` or a pointer to an
array of [VkPhysicalDeviceGroupProperties](#VkPhysicalDeviceGroupProperties) structures.

If `pPhysicalDeviceGroupProperties` is `NULL`, then the number of device
groups available is returned in `pPhysicalDeviceGroupCount`.
Otherwise, `pPhysicalDeviceGroupCount` **must** point to a variable set by
the application to the number of elements in the
`pPhysicalDeviceGroupProperties` array, and on return the variable is
overwritten with the number of structures actually written to
`pPhysicalDeviceGroupProperties`.
If `pPhysicalDeviceGroupCount` is less than the number of device groups
available, at most `pPhysicalDeviceGroupCount` structures will be
written, and [VK_INCOMPLETE](fundamentals.html#VkResult) will be returned instead of
[VK_SUCCESS](fundamentals.html#VkResult), to indicate that not all the available device groups were
returned.

Every physical device **must** be in exactly one device group.

Valid Usage (Implicit)

* 
[](#VUID-vkEnumeratePhysicalDeviceGroups-instance-parameter) VUID-vkEnumeratePhysicalDeviceGroups-instance-parameter

 `instance` **must** be a valid [VkInstance](initialization.html#VkInstance) handle

* 
[](#VUID-vkEnumeratePhysicalDeviceGroups-pPhysicalDeviceGroupCount-parameter) VUID-vkEnumeratePhysicalDeviceGroups-pPhysicalDeviceGroupCount-parameter

 `pPhysicalDeviceGroupCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkEnumeratePhysicalDeviceGroups-pPhysicalDeviceGroupProperties-parameter) VUID-vkEnumeratePhysicalDeviceGroups-pPhysicalDeviceGroupProperties-parameter

 If the value referenced by `pPhysicalDeviceGroupCount` is not `0`, and `pPhysicalDeviceGroupProperties` is not `NULL`, `pPhysicalDeviceGroupProperties` **must** be a valid pointer to an array of `pPhysicalDeviceGroupCount` [VkPhysicalDeviceGroupProperties](#VkPhysicalDeviceGroupProperties) structures

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPhysicalDeviceGroupProperties` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceGroupProperties {
    VkStructureType     sType;
    void*               pNext;
    uint32_t            physicalDeviceCount;
    VkPhysicalDevice    physicalDevices[VK_MAX_DEVICE_GROUP_SIZE];
    VkBool32            subsetAllocation;
} VkPhysicalDeviceGroupProperties;

// Provided by VK_KHR_device_group_creation
// Equivalent to VkPhysicalDeviceGroupProperties
typedef VkPhysicalDeviceGroupProperties VkPhysicalDeviceGroupPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`physicalDeviceCount` is the number of physical devices in the
group.

* 
`physicalDevices` is an array of [VK_MAX_DEVICE_GROUP_SIZE](#VK_MAX_DEVICE_GROUP_SIZE)
[VkPhysicalDevice](#VkPhysicalDevice) handles representing all physical devices in the
group.
The first `physicalDeviceCount` elements of the array will be valid.

* 
`subsetAllocation` specifies whether logical devices created from
the group support allocating device memory on a subset of devices, via
the `deviceMask` member of the [VkMemoryAllocateFlagsInfo](memory.html#VkMemoryAllocateFlagsInfo).
If this is [VK_FALSE](fundamentals.html#VK_FALSE), then all device memory allocations are made
across all physical devices in the group.
If `physicalDeviceCount` is `1`, then `subsetAllocation` **must**
be [VK_FALSE](fundamentals.html#VK_FALSE).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceGroupProperties-sType-sType) VUID-VkPhysicalDeviceGroupProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GROUP_PROPERTIES](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceGroupProperties-pNext-pNext) VUID-VkPhysicalDeviceGroupProperties-pNext-pNext

 `pNext` **must** be `NULL`

[VK_MAX_DEVICE_GROUP_SIZE](#VK_MAX_DEVICE_GROUP_SIZE) is the length of an array containing
[VkPhysicalDevice](#VkPhysicalDevice) handle values representing all physical devices in a
group, as returned in
[VkPhysicalDeviceGroupProperties](#VkPhysicalDeviceGroupProperties)::`physicalDevices`.

#define VK_MAX_DEVICE_GROUP_SIZE          32U

#define VK_MAX_DEVICE_GROUP_SIZE_KHR      VK_MAX_DEVICE_GROUP_SIZE

Logical devices are represented by `VkDevice` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_HANDLE(VkDevice)

A logical device is created as a *connection* to a physical device.
To create a logical device, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateDevice(
    VkPhysicalDevice                            physicalDevice,
    const VkDeviceCreateInfo*                   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDevice*                                   pDevice);

* 
`physicalDevice` **must** be one of the device handles returned from a
call to `vkEnumeratePhysicalDevices` (see
[Physical Device    Enumeration](#devsandqueues-physical-device-enumeration)).

* 
`pCreateInfo` is a pointer to a [VkDeviceCreateInfo](#VkDeviceCreateInfo) structure
containing information about how to create the device.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pDevice` is a pointer to a handle in which the created
[VkDevice](#VkDevice) is returned.

`vkCreateDevice` verifies that extensions and features requested in the
`ppEnabledExtensionNames` and `pEnabledFeatures` members of
`pCreateInfo`, respectively, are supported by the implementation.
If any requested extension is not supported, `vkCreateDevice` **must**
return [VK_ERROR_EXTENSION_NOT_PRESENT](fundamentals.html#VkResult).
If any requested feature is not supported, `vkCreateDevice` **must** return
[VK_ERROR_FEATURE_NOT_PRESENT](fundamentals.html#VkResult).
Support for extensions **can** be checked before creating a device by querying
[vkEnumerateDeviceExtensionProperties](extensions.html#vkEnumerateDeviceExtensionProperties).
Support for features **can** similarly be checked by querying
[vkGetPhysicalDeviceFeatures](features.html#vkGetPhysicalDeviceFeatures).

After verifying and enabling the extensions the `VkDevice` object is
created and returned to the application.

Multiple logical devices **can** be created from the same physical device.
Logical device creation **may** fail due to lack of device-specific resources
(in addition to other errors).
If that occurs, `vkCreateDevice` will return
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult).

Valid Usage

* 
[](#VUID-vkCreateDevice-ppEnabledExtensionNames-01387) VUID-vkCreateDevice-ppEnabledExtensionNames-01387

All [required device    extensions](extensions.html#extendingvulkan-extensions-extensiondependencies) for each extension in the
[VkDeviceCreateInfo](#VkDeviceCreateInfo)::`ppEnabledExtensionNames` list **must** also
be present in that list

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDevice-physicalDevice-parameter) VUID-vkCreateDevice-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](#VkPhysicalDevice) handle

* 
[](#VUID-vkCreateDevice-pCreateInfo-parameter) VUID-vkCreateDevice-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkDeviceCreateInfo](#VkDeviceCreateInfo) structure

* 
[](#VUID-vkCreateDevice-pAllocator-parameter) VUID-vkCreateDevice-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDevice-pDevice-parameter) VUID-vkCreateDevice-pDevice-parameter

 `pDevice` **must** be a valid pointer to a [VkDevice](#VkDevice) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult)

* 
[VK_ERROR_EXTENSION_NOT_PRESENT](fundamentals.html#VkResult)

* 
[VK_ERROR_FEATURE_NOT_PRESENT](fundamentals.html#VkResult)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkDeviceCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDeviceCreateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    VkDeviceCreateFlags                flags;
    uint32_t                           queueCreateInfoCount;
    const VkDeviceQueueCreateInfo*     pQueueCreateInfos;
    // enabledLayerCount is legacy and ignored
    uint32_t                           enabledLayerCount;
    // ppEnabledLayerNames is legacy and ignored
    const char* const*                 ppEnabledLayerNames;
    uint32_t                           enabledExtensionCount;
    const char* const*                 ppEnabledExtensionNames;
    const VkPhysicalDeviceFeatures*    pEnabledFeatures;
} VkDeviceCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`queueCreateInfoCount` is the unsigned integer size of the
`pQueueCreateInfos` array.
Refer to the [Queue Creation](#devsandqueues-queue-creation) section
below for further details.

* 
`pQueueCreateInfos` is a pointer to an array of
[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structures describing the queues that are
requested to be created along with the logical device.
Refer to the [Queue Creation](#devsandqueues-queue-creation) section
below for further details.

* 
`enabledLayerCount` is legacy and ignored.
See [Device Layers: Superseded via instance layers](../appendices/legacy.html#legacy-devicelayers).

* 
`ppEnabledLayerNames` is legacy and ignored.
See [Device Layers: Superseded via instance layers](../appendices/legacy.html#legacy-devicelayers).

* 
`enabledExtensionCount` is the number of device extensions to
enable.

* 
`ppEnabledExtensionNames` is a pointer to an array of
`enabledExtensionCount` null-terminated UTF-8 strings containing the
names of extensions to enable for the created device.
See the [Extensions](extensions.html#extendingvulkan-extensions) section for further details.

* 
`pEnabledFeatures` is `NULL` or a pointer to a
[VkPhysicalDeviceFeatures](features.html#VkPhysicalDeviceFeatures) structure containing boolean indicators
of all the features to be enabled.
Refer to the [Features](features.html#features) section for further details.
This field is legacy.
See [Physical Device Queries: Superseded via version 2](../appendices/legacy.html#legacy-gpdp2).

Valid Usage

* 
[](#VUID-VkDeviceCreateInfo-queueFamilyIndex-02802) VUID-VkDeviceCreateInfo-queueFamilyIndex-02802

The combination of the values in the `queueFamilyIndex` and
`flags` members of each element of `pQueueCreateInfos` **must** be
unique within `pQueueCreateInfos`

* 
[](#VUID-VkDeviceCreateInfo-pQueueCreateInfos-06755) VUID-VkDeviceCreateInfo-pQueueCreateInfos-06755

If multiple elements of `pQueueCreateInfos` share the same
`queueFamilyIndex`, the sum of their `queueCount` members **must**
be less than or equal to the `queueCount` member of the
`VkQueueFamilyProperties` structure, as returned by
`vkGetPhysicalDeviceQueueFamilyProperties` in the
`pQueueFamilyProperties`[queueFamilyIndex]

* 
[](#VUID-VkDeviceCreateInfo-pQueueCreateInfos-06654) VUID-VkDeviceCreateInfo-pQueueCreateInfos-06654

If multiple elements of `pQueueCreateInfos` share the same
`queueFamilyIndex`, then all of such elements **must** have the same
global priority level, which **can** be specified explicitly by the
including a [VkDeviceQueueGlobalPriorityCreateInfo](#VkDeviceQueueGlobalPriorityCreateInfo) structure in the
`pNext` chain, or by the implicit default value

* 
[](#VUID-VkDeviceCreateInfo-pNext-00373) VUID-VkDeviceCreateInfo-pNext-00373

If the `pNext` chain includes a [VkPhysicalDeviceFeatures2](features.html#VkPhysicalDeviceFeatures2)
structure, then `pEnabledFeatures` **must** be `NULL`

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-01840) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-01840

If [VkPhysicalDeviceProperties](#VkPhysicalDeviceProperties)::`apiVersion` advertises Vulkan
1.1 or later, `ppEnabledExtensionNames` **must** not contain
`[VK_AMD_negative_viewport_height](../appendices/extensions.html#VK_AMD_negative_viewport_height)`

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-00374) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-00374

`ppEnabledExtensionNames` **must** not contain both
`[VK_KHR_maintenance1](../appendices/extensions.html#VK_KHR_maintenance1)` and
`[VK_AMD_negative_viewport_height](../appendices/extensions.html#VK_AMD_negative_viewport_height)`

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-03328) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-03328

`ppEnabledExtensionNames` **must** not contain both
`[VK_KHR_buffer_device_address](../appendices/extensions.html#VK_KHR_buffer_device_address)` and
`[VK_EXT_buffer_device_address](../appendices/extensions.html#VK_EXT_buffer_device_address)`

* 
[](#VUID-VkDeviceCreateInfo-pNext-04748) VUID-VkDeviceCreateInfo-pNext-04748

If the `pNext` chain includes a
[VkPhysicalDeviceVulkan12Features](features.html#VkPhysicalDeviceVulkan12Features) structure and
[VkPhysicalDeviceVulkan12Features](features.html#VkPhysicalDeviceVulkan12Features)::`bufferDeviceAddress` is
[VK_TRUE](fundamentals.html#VK_TRUE), `ppEnabledExtensionNames` **must** not contain
`[VK_EXT_buffer_device_address](../appendices/extensions.html#VK_EXT_buffer_device_address)`

* 
[](#VUID-VkDeviceCreateInfo-pNext-02829) VUID-VkDeviceCreateInfo-pNext-02829

If the `pNext` chain includes a
[VkPhysicalDeviceVulkan11Features](features.html#VkPhysicalDeviceVulkan11Features) structure, then it **must** not
include a [VkPhysicalDevice16BitStorageFeatures](features.html#VkPhysicalDevice16BitStorageFeatures),
[VkPhysicalDeviceMultiviewFeatures](features.html#VkPhysicalDeviceMultiviewFeatures),
[VkPhysicalDeviceVariablePointersFeatures](features.html#VkPhysicalDeviceVariablePointersFeatures),
[VkPhysicalDeviceProtectedMemoryFeatures](features.html#VkPhysicalDeviceProtectedMemoryFeatures),
[VkPhysicalDeviceSamplerYcbcrConversionFeatures](features.html#VkPhysicalDeviceSamplerYcbcrConversionFeatures), or
[VkPhysicalDeviceShaderDrawParametersFeatures](features.html#VkPhysicalDeviceShaderDrawParametersFeatures) structure

* 
[](#VUID-VkDeviceCreateInfo-pNext-02830) VUID-VkDeviceCreateInfo-pNext-02830

If the `pNext` chain includes a
[VkPhysicalDeviceVulkan12Features](features.html#VkPhysicalDeviceVulkan12Features) structure, then it **must** not
include a [VkPhysicalDevice8BitStorageFeatures](features.html#VkPhysicalDevice8BitStorageFeatures),
[VkPhysicalDeviceShaderAtomicInt64Features](features.html#VkPhysicalDeviceShaderAtomicInt64Features),
[VkPhysicalDeviceShaderFloat16Int8Features](features.html#VkPhysicalDeviceShaderFloat16Int8Features),
[VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures),
[VkPhysicalDeviceScalarBlockLayoutFeatures](features.html#VkPhysicalDeviceScalarBlockLayoutFeatures),
[VkPhysicalDeviceImagelessFramebufferFeatures](features.html#VkPhysicalDeviceImagelessFramebufferFeatures),
[VkPhysicalDeviceUniformBufferStandardLayoutFeatures](features.html#VkPhysicalDeviceUniformBufferStandardLayoutFeatures),
[VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures](features.html#VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures),
[VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures](features.html#VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures),
[VkPhysicalDeviceHostQueryResetFeatures](features.html#VkPhysicalDeviceHostQueryResetFeatures),
[VkPhysicalDeviceTimelineSemaphoreFeatures](features.html#VkPhysicalDeviceTimelineSemaphoreFeatures),
[VkPhysicalDeviceBufferDeviceAddressFeatures](features.html#VkPhysicalDeviceBufferDeviceAddressFeatures), or
[VkPhysicalDeviceVulkanMemoryModelFeatures](features.html#VkPhysicalDeviceVulkanMemoryModelFeatures) structure

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-04476) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-04476

If `ppEnabledExtensionNames` contains
`"VK_KHR_shader_draw_parameters"` and the `pNext` chain includes a
[VkPhysicalDeviceVulkan11Features](features.html#VkPhysicalDeviceVulkan11Features) structure, then
`VkPhysicalDeviceVulkan11Features`::`shaderDrawParameters` **must**
be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02831) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02831

If `ppEnabledExtensionNames` contains `"VK_KHR_draw_indirect_count"`
and the `pNext` chain includes a
[VkPhysicalDeviceVulkan12Features](features.html#VkPhysicalDeviceVulkan12Features) structure, then
`VkPhysicalDeviceVulkan12Features`::`drawIndirectCount` **must** be
[VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02832) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02832

If `ppEnabledExtensionNames` contains
`"VK_KHR_sampler_mirror_clamp_to_edge"` and the `pNext` chain
includes a [VkPhysicalDeviceVulkan12Features](features.html#VkPhysicalDeviceVulkan12Features) structure, then
`VkPhysicalDeviceVulkan12Features`::`samplerMirrorClampToEdge`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02833) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02833

If `ppEnabledExtensionNames` contains `"VK_EXT_descriptor_indexing"`
and the `pNext` chain includes a
[VkPhysicalDeviceVulkan12Features](features.html#VkPhysicalDeviceVulkan12Features) structure, then
`VkPhysicalDeviceVulkan12Features`::`descriptorIndexing` **must**
be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02834) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02834

If `ppEnabledExtensionNames` contains
`"VK_EXT_sampler_filter_minmax"` and the `pNext` chain includes a
[VkPhysicalDeviceVulkan12Features](features.html#VkPhysicalDeviceVulkan12Features) structure, then
`VkPhysicalDeviceVulkan12Features`::`samplerFilterMinmax` **must**
be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02835) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-02835

If `ppEnabledExtensionNames` contains
`"VK_EXT_shader_viewport_index_layer"` and the `pNext` chain
includes a [VkPhysicalDeviceVulkan12Features](features.html#VkPhysicalDeviceVulkan12Features) structure, then
`VkPhysicalDeviceVulkan12Features`::`shaderOutputViewportIndex`
and `VkPhysicalDeviceVulkan12Features`::`shaderOutputLayer`
**must** both be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkDeviceCreateInfo-pNext-06532) VUID-VkDeviceCreateInfo-pNext-06532

If the `pNext` chain includes a
[VkPhysicalDeviceVulkan13Features](features.html#VkPhysicalDeviceVulkan13Features) structure, then it **must** not
include a [VkPhysicalDeviceDynamicRenderingFeatures](features.html#VkPhysicalDeviceDynamicRenderingFeatures),
[VkPhysicalDeviceImageRobustnessFeatures](features.html#VkPhysicalDeviceImageRobustnessFeatures),
[VkPhysicalDeviceInlineUniformBlockFeatures](features.html#VkPhysicalDeviceInlineUniformBlockFeatures),
[VkPhysicalDeviceMaintenance4Features](features.html#VkPhysicalDeviceMaintenance4Features),
[VkPhysicalDevicePipelineCreationCacheControlFeatures](features.html#VkPhysicalDevicePipelineCreationCacheControlFeatures),
[VkPhysicalDevicePrivateDataFeatures](features.html#VkPhysicalDevicePrivateDataFeatures),
[VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures](features.html#VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures),
[VkPhysicalDeviceShaderIntegerDotProductFeatures](features.html#VkPhysicalDeviceShaderIntegerDotProductFeatures),
[VkPhysicalDeviceShaderTerminateInvocationFeatures](features.html#VkPhysicalDeviceShaderTerminateInvocationFeatures),
[VkPhysicalDeviceSubgroupSizeControlFeatures](features.html#VkPhysicalDeviceSubgroupSizeControlFeatures),
[VkPhysicalDeviceSynchronization2Features](features.html#VkPhysicalDeviceSynchronization2Features),
[VkPhysicalDeviceTextureCompressionASTCHDRFeatures](features.html#VkPhysicalDeviceTextureCompressionASTCHDRFeatures), or
[VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures](features.html#VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures) structure

* 
[](#VUID-VkDeviceCreateInfo-pNext-10360) VUID-VkDeviceCreateInfo-pNext-10360

If the `pNext` chain includes a
[VkPhysicalDeviceVulkan14Features](features.html#VkPhysicalDeviceVulkan14Features) structure, then it **must** not
include a [VkPhysicalDeviceGlobalPriorityQueryFeatures](features.html#VkPhysicalDeviceGlobalPriorityQueryFeatures),
[VkPhysicalDeviceShaderSubgroupRotateFeatures](features.html#VkPhysicalDeviceShaderSubgroupRotateFeatures),
[VkPhysicalDeviceShaderFloatControls2Features](features.html#VkPhysicalDeviceShaderFloatControls2Features),
[VkPhysicalDeviceShaderExpectAssumeFeatures](features.html#VkPhysicalDeviceShaderExpectAssumeFeatures),
[VkPhysicalDeviceLineRasterizationFeatures](features.html#VkPhysicalDeviceLineRasterizationFeatures),
[VkPhysicalDeviceVertexAttributeDivisorFeatures](features.html#VkPhysicalDeviceVertexAttributeDivisorFeatures),
[VkPhysicalDeviceIndexTypeUint8Features](features.html#VkPhysicalDeviceIndexTypeUint8Features),
[VkPhysicalDeviceDynamicRenderingLocalReadFeatures](features.html#VkPhysicalDeviceDynamicRenderingLocalReadFeatures),
[VkPhysicalDeviceMaintenance5Features](features.html#VkPhysicalDeviceMaintenance5Features),
[VkPhysicalDeviceMaintenance6Features](features.html#VkPhysicalDeviceMaintenance6Features),
[VkPhysicalDevicePipelineProtectedAccessFeatures](features.html#VkPhysicalDevicePipelineProtectedAccessFeatures),
[VkPhysicalDevicePipelineRobustnessFeatures](features.html#VkPhysicalDevicePipelineRobustnessFeatures), or
[VkPhysicalDeviceHostImageCopyFeatures](features.html#VkPhysicalDeviceHostImageCopyFeatures) structure

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-10858) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-10858

If `ppEnabledExtensionNames` contains `"VK_KHR_push_descriptor"` and
the `pNext` chain includes a [VkPhysicalDeviceVulkan14Features](features.html#VkPhysicalDeviceVulkan14Features)
structure, then
`VkPhysicalDeviceVulkan14Features`::`pushDescriptor` **must** be
[VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkDeviceCreateInfo-pProperties-04451) VUID-VkDeviceCreateInfo-pProperties-04451

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is included in
`pProperties` of [vkEnumerateDeviceExtensionProperties](extensions.html#vkEnumerateDeviceExtensionProperties),
`ppEnabledExtensionNames` **must** include
`"VK_KHR_portability_subset"`

* 
[](#VUID-VkDeviceCreateInfo-shadingRateImage-04478) VUID-VkDeviceCreateInfo-shadingRateImage-04478

If the [`shadingRateImage`](features.html#features-shadingRateImage) feature is
enabled, the [    `pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-shadingRateImage-04479) VUID-VkDeviceCreateInfo-shadingRateImage-04479

If the [`shadingRateImage`](features.html#features-shadingRateImage) feature is
enabled, the [    `primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-shadingRateImage-04480) VUID-VkDeviceCreateInfo-shadingRateImage-04480

If the [`shadingRateImage`](features.html#features-shadingRateImage) feature is
enabled, the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-fragmentDensityMap-04481) VUID-VkDeviceCreateInfo-fragmentDensityMap-04481

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is enabled, the [    `pipelineFragmentShadingRate`](features.html#features-pipelineFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-fragmentDensityMap-04482) VUID-VkDeviceCreateInfo-fragmentDensityMap-04482

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is enabled, the [    `primitiveFragmentShadingRate`](features.html#features-primitiveFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-fragmentDensityMap-04483) VUID-VkDeviceCreateInfo-fragmentDensityMap-04483

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is enabled, the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature **must** not be enabled

* 
[](#VUID-VkDeviceCreateInfo-None-04896) VUID-VkDeviceCreateInfo-None-04896

If the [    `sparseImageInt64Atomics`](features.html#features-sparseImageInt64Atomics) feature is enabled,
[`shaderImageInt64Atomics`](features.html#features-shaderImageInt64Atomics)
**must** be enabled

* 
[](#VUID-VkDeviceCreateInfo-None-04897) VUID-VkDeviceCreateInfo-None-04897

If the [    `sparseImageFloat32Atomics`](features.html#features-sparseImageFloat32Atomics) feature is enabled,
[`shaderImageFloat32Atomics`](features.html#features-shaderImageFloat32Atomics)
**must** be enabled

* 
[](#VUID-VkDeviceCreateInfo-None-04898) VUID-VkDeviceCreateInfo-None-04898

If the [    `sparseImageFloat32AtomicAdd`](features.html#features-sparseImageFloat32AtomicAdd) feature is enabled,
[    `shaderImageFloat32AtomicAdd`](features.html#features-shaderImageFloat32AtomicAdd) **must** be enabled

* 
[](#VUID-VkDeviceCreateInfo-sparseImageFloat32AtomicMinMax-04975) VUID-VkDeviceCreateInfo-sparseImageFloat32AtomicMinMax-04975

If the [    `sparseImageFloat32AtomicMinMax`](features.html#features-sparseImageFloat32AtomicMinMax) feature is enabled,
[    `shaderImageFloat32AtomicMinMax`](features.html#features-shaderImageFloat32AtomicMinMax) **must** be enabled

* 
[](#VUID-VkDeviceCreateInfo-robustBufferAccess-10247) VUID-VkDeviceCreateInfo-robustBufferAccess-10247

If the [`robustBufferAccess`](features.html#features-robustBufferAccess) feature
is enabled, and [    `robustBufferAccessUpdateAfterBind`](#limits-robustBufferAccessUpdateAfterBind) is [VK_FALSE](fundamentals.html#VK_FALSE), then
[    `descriptorBindingUniformBufferUpdateAfterBind`](features.html#features-descriptorBindingUniformBufferUpdateAfterBind),
[    `descriptorBindingStorageBufferUpdateAfterBind`](features.html#features-descriptorBindingStorageBufferUpdateAfterBind),
[    `descriptorBindingUniformTexelBufferUpdateAfterBind`](features.html#features-descriptorBindingUniformTexelBufferUpdateAfterBind), and
[    `descriptorBindingStorageTexelBufferUpdateAfterBind`](features.html#features-descriptorBindingStorageTexelBufferUpdateAfterBind) **must** not be
enabled

* 
[](#VUID-VkDeviceCreateInfo-None-08095) VUID-VkDeviceCreateInfo-None-08095

If the [`descriptorBuffer`](features.html#features-descriptorBuffer) feature is
enabled, `ppEnabledExtensionNames` **must** not contain
`[VK_AMD_shader_fragment_mask](../appendices/extensions.html#VK_AMD_shader_fragment_mask)`

* 
[](#VUID-VkDeviceCreateInfo-pNext-09396) VUID-VkDeviceCreateInfo-pNext-09396

If the `pNext` chain includes a
[VkDeviceQueueShaderCoreControlCreateInfoARM](#VkDeviceQueueShaderCoreControlCreateInfoARM) structure, then it
**must** not be included in the `pNext` chain of any of the
[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structures in `pQueueCreateInfos`

* 
[](#VUID-VkDeviceCreateInfo-pNext-09397) VUID-VkDeviceCreateInfo-pNext-09397

If the `pNext` chain includes a
[VkDeviceQueueShaderCoreControlCreateInfoARM](#VkDeviceQueueShaderCoreControlCreateInfoARM) structure then
[VkPhysicalDeviceSchedulingControlsPropertiesARM](#VkPhysicalDeviceSchedulingControlsPropertiesARM)::`schedulingControlsFlags`
**must** contain
[VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_SHADER_CORE_COUNT_ARM](#VkPhysicalDeviceSchedulingControlsFlagBitsARM)

* 
[](#VUID-VkDeviceCreateInfo-None-10778) VUID-VkDeviceCreateInfo-None-10778

If the [maintenance9](features.html#features-maintenance9) feature is not supported,
`queueCreateInfoCount` **must** be greater than `0`

* 
[](#VUID-VkDeviceCreateInfo-queueFamilyIndex-11831) VUID-VkDeviceCreateInfo-queueFamilyIndex-11831

If any element of pQueueCreateInfos specifies a `queueFamilyIndex`
that supports [VK_QUEUE_DATA_GRAPH_BIT_ARM](#VkQueueFlagBits) and that
`queueFamilyIndex` enumerates an engine through
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](VK_ARM_data_graph/graphs.html#vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM) with
`type`
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphProcessingEngineTypeARM)
or
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](VK_ARM_data_graph/graphs.html#VkPhysicalDeviceDataGraphProcessingEngineTypeARM),
a [VkPhysicalDeviceDataGraphModelFeaturesQCOM](features.html#VkPhysicalDeviceDataGraphModelFeaturesQCOM) structure **must** be
included in `pNext` with [    dataGraphModel](features.html#features-dataGraphModelQCOM) set to [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkDeviceCreateInfo-deviceAddressCommands-13048) VUID-VkDeviceCreateInfo-deviceAddressCommands-13048

If the [`deviceAddressCommands`](features.html#features-deviceAddressCommands)
feature is enabled, the [    `accelerationStructureHostCommands`](features.html#features-accelerationStructureHostCommands) feature **must** not be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceCreateInfo-sType-sType) VUID-VkDeviceCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceCreateInfo-pNext-pNext) VUID-VkDeviceCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceDeviceMemoryReportCreateInfoEXT](#VkDeviceDeviceMemoryReportCreateInfoEXT), [VkDeviceDiagnosticsConfigCreateInfoNV](#VkDeviceDiagnosticsConfigCreateInfoNV), [VkDeviceGroupDeviceCreateInfo](#VkDeviceGroupDeviceCreateInfo), [VkDeviceMemoryOverallocationCreateInfoAMD](#VkDeviceMemoryOverallocationCreateInfoAMD), [VkDevicePipelineBinaryInternalCacheControlKHR](#VkDevicePipelineBinaryInternalCacheControlKHR), [VkDevicePrivateDataCreateInfo](#VkDevicePrivateDataCreateInfo), [VkDeviceQueueShaderCoreControlCreateInfoARM](#VkDeviceQueueShaderCoreControlCreateInfoARM), [VkExternalComputeQueueDeviceCreateInfoNV](VK_NV_external_compute_queue/VK_NV_external_compute_queue.html#VkExternalComputeQueueDeviceCreateInfoNV), [VkPhysicalDevice16BitStorageFeatures](features.html#VkPhysicalDevice16BitStorageFeatures), [VkPhysicalDevice4444FormatsFeaturesEXT](features.html#VkPhysicalDevice4444FormatsFeaturesEXT), [VkPhysicalDevice8BitStorageFeatures](features.html#VkPhysicalDevice8BitStorageFeatures), [VkPhysicalDeviceASTCDecodeFeaturesEXT](features.html#VkPhysicalDeviceASTCDecodeFeaturesEXT), [VkPhysicalDeviceAccelerationStructureFeaturesKHR](features.html#VkPhysicalDeviceAccelerationStructureFeaturesKHR), [VkPhysicalDeviceAddressBindingReportFeaturesEXT](features.html#VkPhysicalDeviceAddressBindingReportFeaturesEXT), [VkPhysicalDeviceAmigoProfilingFeaturesSEC](../appendices/extensions.html#VkPhysicalDeviceAmigoProfilingFeaturesSEC), [VkPhysicalDeviceAntiLagFeaturesAMD](features.html#VkPhysicalDeviceAntiLagFeaturesAMD), [VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT](features.html#VkPhysicalDeviceAttachmentFeedbackLoopDynamicStateFeaturesEXT), [VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT](features.html#VkPhysicalDeviceAttachmentFeedbackLoopLayoutFeaturesEXT), [VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT](features.html#VkPhysicalDeviceBlendOperationAdvancedFeaturesEXT), [VkPhysicalDeviceBorderColorSwizzleFeaturesEXT](features.html#VkPhysicalDeviceBorderColorSwizzleFeaturesEXT), [VkPhysicalDeviceBufferDeviceAddressFeatures](features.html#VkPhysicalDeviceBufferDeviceAddressFeatures), [VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](features.html#VkPhysicalDeviceBufferDeviceAddressFeaturesEXT), [VkPhysicalDeviceClusterAccelerationStructureFeaturesNV](features.html#VkPhysicalDeviceClusterAccelerationStructureFeaturesNV), [VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI](features.html#VkPhysicalDeviceClusterCullingShaderFeaturesHUAWEI), [VkPhysicalDeviceCoherentMemoryFeaturesAMD](features.html#VkPhysicalDeviceCoherentMemoryFeaturesAMD), [VkPhysicalDeviceColorWriteEnableFeaturesEXT](features.html#VkPhysicalDeviceColorWriteEnableFeaturesEXT), [VkPhysicalDeviceCommandBufferInheritanceFeaturesNV](features.html#VkPhysicalDeviceCommandBufferInheritanceFeaturesNV), [VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV](features.html#VkPhysicalDeviceComputeOccupancyPriorityFeaturesNV), [VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR](features.html#VkPhysicalDeviceComputeShaderDerivativesFeaturesKHR), [VkPhysicalDeviceConditionalRenderingFeaturesEXT](features.html#VkPhysicalDeviceConditionalRenderingFeaturesEXT), [VkPhysicalDeviceCooperativeMatrix2FeaturesNV](features.html#VkPhysicalDeviceCooperativeMatrix2FeaturesNV), [VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM](features.html#VkPhysicalDeviceCooperativeMatrixConversionFeaturesQCOM), [VkPhysicalDeviceCooperativeMatrixFeaturesKHR](features.html#VkPhysicalDeviceCooperativeMatrixFeaturesKHR), [VkPhysicalDeviceCooperativeMatrixFeaturesNV](features.html#VkPhysicalDeviceCooperativeMatrixFeaturesNV), [VkPhysicalDeviceCooperativeVectorFeaturesNV](features.html#VkPhysicalDeviceCooperativeVectorFeaturesNV), [VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR](features.html#VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR), [VkPhysicalDeviceCopyMemoryIndirectFeaturesNV](features.html#VkPhysicalDeviceCopyMemoryIndirectFeaturesNV), [VkPhysicalDeviceCornerSampledImageFeaturesNV](features.html#VkPhysicalDeviceCornerSampledImageFeaturesNV), [VkPhysicalDeviceCoverageReductionModeFeaturesNV](features.html#VkPhysicalDeviceCoverageReductionModeFeaturesNV), [VkPhysicalDeviceCubicClampFeaturesQCOM](features.html#VkPhysicalDeviceCubicClampFeaturesQCOM), [VkPhysicalDeviceCubicWeightsFeaturesQCOM](features.html#VkPhysicalDeviceCubicWeightsFeaturesQCOM), [VkPhysicalDeviceCudaKernelLaunchFeaturesNV](features.html#VkPhysicalDeviceCudaKernelLaunchFeaturesNV), [VkPhysicalDeviceCustomBorderColorFeaturesEXT](features.html#VkPhysicalDeviceCustomBorderColorFeaturesEXT), [VkPhysicalDeviceCustomResolveFeaturesEXT](features.html#VkPhysicalDeviceCustomResolveFeaturesEXT), [VkPhysicalDeviceDataGraphFeaturesARM](features.html#VkPhysicalDeviceDataGraphFeaturesARM), [VkPhysicalDeviceDataGraphModelFeaturesQCOM](features.html#VkPhysicalDeviceDataGraphModelFeaturesQCOM), [VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV](features.html#VkPhysicalDeviceDedicatedAllocationImageAliasingFeaturesNV), [VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX](features.html#VkPhysicalDeviceDenseGeometryFormatFeaturesAMDX), [VkPhysicalDeviceDepthBiasControlFeaturesEXT](features.html#VkPhysicalDeviceDepthBiasControlFeaturesEXT), [VkPhysicalDeviceDepthClampControlFeaturesEXT](features.html#VkPhysicalDeviceDepthClampControlFeaturesEXT), [VkPhysicalDeviceDepthClampZeroOneFeaturesKHR](features.html#VkPhysicalDeviceDepthClampZeroOneFeaturesKHR), [VkPhysicalDeviceDepthClipControlFeaturesEXT](features.html#VkPhysicalDeviceDepthClipControlFeaturesEXT), [VkPhysicalDeviceDepthClipEnableFeaturesEXT](features.html#VkPhysicalDeviceDepthClipEnableFeaturesEXT), [VkPhysicalDeviceDescriptorBufferFeaturesEXT](features.html#VkPhysicalDeviceDescriptorBufferFeaturesEXT), [VkPhysicalDeviceDescriptorBufferTensorFeaturesARM](features.html#VkPhysicalDeviceDescriptorBufferTensorFeaturesARM), [VkPhysicalDeviceDescriptorHeapFeaturesEXT](features.html#VkPhysicalDeviceDescriptorHeapFeaturesEXT), [VkPhysicalDeviceDescriptorIndexingFeatures](features.html#VkPhysicalDeviceDescriptorIndexingFeatures), [VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV](features.html#VkPhysicalDeviceDescriptorPoolOverallocationFeaturesNV), [VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE](../appendices/extensions.html#VkPhysicalDeviceDescriptorSetHostMappingFeaturesVALVE), [VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR](features.html#VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR), [VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV](features.html#VkPhysicalDeviceDeviceGeneratedCommandsComputeFeaturesNV), [VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT](features.html#VkPhysicalDeviceDeviceGeneratedCommandsFeaturesEXT), [VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV](features.html#VkPhysicalDeviceDeviceGeneratedCommandsFeaturesNV), [VkPhysicalDeviceDeviceMemoryReportFeaturesEXT](features.html#VkPhysicalDeviceDeviceMemoryReportFeaturesEXT), [VkPhysicalDeviceDiagnosticsConfigFeaturesNV](features.html#VkPhysicalDeviceDiagnosticsConfigFeaturesNV), [VkPhysicalDeviceDisplacementMicromapFeaturesNV](features.html#VkPhysicalDeviceDisplacementMicromapFeaturesNV), [VkPhysicalDeviceDynamicRenderingFeatures](features.html#VkPhysicalDeviceDynamicRenderingFeatures), [VkPhysicalDeviceDynamicRenderingLocalReadFeatures](features.html#VkPhysicalDeviceDynamicRenderingLocalReadFeatures), [VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT](features.html#VkPhysicalDeviceDynamicRenderingUnusedAttachmentsFeaturesEXT), [VkPhysicalDeviceExclusiveScissorFeaturesNV](features.html#VkPhysicalDeviceExclusiveScissorFeaturesNV), [VkPhysicalDeviceExtendedDynamicState2FeaturesEXT](features.html#VkPhysicalDeviceExtendedDynamicState2FeaturesEXT), [VkPhysicalDeviceExtendedDynamicState3FeaturesEXT](features.html#VkPhysicalDeviceExtendedDynamicState3FeaturesEXT), [VkPhysicalDeviceExtendedDynamicStateFeaturesEXT](features.html#VkPhysicalDeviceExtendedDynamicStateFeaturesEXT), [VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV](features.html#VkPhysicalDeviceExtendedSparseAddressSpaceFeaturesNV), [VkPhysicalDeviceExternalFormatResolveFeaturesANDROID](features.html#VkPhysicalDeviceExternalFormatResolveFeaturesANDROID), [VkPhysicalDeviceExternalMemoryRDMAFeaturesNV](features.html#VkPhysicalDeviceExternalMemoryRDMAFeaturesNV), [VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX](features.html#VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX), [VkPhysicalDeviceFaultFeaturesEXT](features.html#VkPhysicalDeviceFaultFeaturesEXT), [VkPhysicalDeviceFeatures2](features.html#VkPhysicalDeviceFeatures2), [VkPhysicalDeviceFormatPackFeaturesARM](features.html#VkPhysicalDeviceFormatPackFeaturesARM), [VkPhysicalDeviceFragmentDensityMap2FeaturesEXT](features.html#VkPhysicalDeviceFragmentDensityMap2FeaturesEXT), [VkPhysicalDeviceFragmentDensityMapFeaturesEXT](features.html#VkPhysicalDeviceFragmentDensityMapFeaturesEXT), [VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE](features.html#VkPhysicalDeviceFragmentDensityMapLayeredFeaturesVALVE), [VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT](features.html#VkPhysicalDeviceFragmentDensityMapOffsetFeaturesEXT), [VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR](features.html#VkPhysicalDeviceFragmentShaderBarycentricFeaturesKHR), [VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT](features.html#VkPhysicalDeviceFragmentShaderInterlockFeaturesEXT), [VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV](features.html#VkPhysicalDeviceFragmentShadingRateEnumsFeaturesNV), [VkPhysicalDeviceFragmentShadingRateFeaturesKHR](features.html#VkPhysicalDeviceFragmentShadingRateFeaturesKHR), [VkPhysicalDeviceFrameBoundaryFeaturesEXT](features.html#VkPhysicalDeviceFrameBoundaryFeaturesEXT), [VkPhysicalDeviceGlobalPriorityQueryFeatures](features.html#VkPhysicalDeviceGlobalPriorityQueryFeatures), [VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT](features.html#VkPhysicalDeviceGraphicsPipelineLibraryFeaturesEXT), [VkPhysicalDeviceHdrVividFeaturesHUAWEI](features.html#VkPhysicalDeviceHdrVividFeaturesHUAWEI), [VkPhysicalDeviceHostImageCopyFeatures](features.html#VkPhysicalDeviceHostImageCopyFeatures), [VkPhysicalDeviceHostQueryResetFeatures](features.html#VkPhysicalDeviceHostQueryResetFeatures), [VkPhysicalDeviceImage2DViewOf3DFeaturesEXT](features.html#VkPhysicalDeviceImage2DViewOf3DFeaturesEXT), [VkPhysicalDeviceImageAlignmentControlFeaturesMESA](features.html#VkPhysicalDeviceImageAlignmentControlFeaturesMESA), [VkPhysicalDeviceImageCompressionControlFeaturesEXT](features.html#VkPhysicalDeviceImageCompressionControlFeaturesEXT), [VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT](features.html#VkPhysicalDeviceImageCompressionControlSwapchainFeaturesEXT), [VkPhysicalDeviceImageProcessing2FeaturesQCOM](features.html#VkPhysicalDeviceImageProcessing2FeaturesQCOM), [VkPhysicalDeviceImageProcessingFeaturesQCOM](features.html#VkPhysicalDeviceImageProcessingFeaturesQCOM), [VkPhysicalDeviceImageRobustnessFeatures](features.html#VkPhysicalDeviceImageRobustnessFeatures), [VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT](features.html#VkPhysicalDeviceImageSlicedViewOf3DFeaturesEXT), [VkPhysicalDeviceImageViewMinLodFeaturesEXT](features.html#VkPhysicalDeviceImageViewMinLodFeaturesEXT), [VkPhysicalDeviceImagelessFramebufferFeatures](features.html#VkPhysicalDeviceImagelessFramebufferFeatures), [VkPhysicalDeviceIndexTypeUint8Features](features.html#VkPhysicalDeviceIndexTypeUint8Features), [VkPhysicalDeviceInheritedViewportScissorFeaturesNV](features.html#VkPhysicalDeviceInheritedViewportScissorFeaturesNV), [VkPhysicalDeviceInlineUniformBlockFeatures](features.html#VkPhysicalDeviceInlineUniformBlockFeatures), [VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR](features.html#VkPhysicalDeviceInternallySynchronizedQueuesFeaturesKHR), [VkPhysicalDeviceInvocationMaskFeaturesHUAWEI](features.html#VkPhysicalDeviceInvocationMaskFeaturesHUAWEI), [VkPhysicalDeviceLegacyDitheringFeaturesEXT](features.html#VkPhysicalDeviceLegacyDitheringFeaturesEXT), [VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT](features.html#VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT), [VkPhysicalDeviceLineRasterizationFeatures](features.html#VkPhysicalDeviceLineRasterizationFeatures), [VkPhysicalDeviceLinearColorAttachmentFeaturesNV](features.html#VkPhysicalDeviceLinearColorAttachmentFeaturesNV), [VkPhysicalDeviceMaintenance10FeaturesKHR](features.html#VkPhysicalDeviceMaintenance10FeaturesKHR), [VkPhysicalDeviceMaintenance4Features](features.html#VkPhysicalDeviceMaintenance4Features), [VkPhysicalDeviceMaintenance5Features](features.html#VkPhysicalDeviceMaintenance5Features), [VkPhysicalDeviceMaintenance6Features](features.html#VkPhysicalDeviceMaintenance6Features), [VkPhysicalDeviceMaintenance7FeaturesKHR](features.html#VkPhysicalDeviceMaintenance7FeaturesKHR), [VkPhysicalDeviceMaintenance8FeaturesKHR](features.html#VkPhysicalDeviceMaintenance8FeaturesKHR), [VkPhysicalDeviceMaintenance9FeaturesKHR](features.html#VkPhysicalDeviceMaintenance9FeaturesKHR), [VkPhysicalDeviceMapMemoryPlacedFeaturesEXT](features.html#VkPhysicalDeviceMapMemoryPlacedFeaturesEXT), [VkPhysicalDeviceMemoryDecompressionFeaturesEXT](features.html#VkPhysicalDeviceMemoryDecompressionFeaturesEXT), [VkPhysicalDeviceMemoryPriorityFeaturesEXT](features.html#VkPhysicalDeviceMemoryPriorityFeaturesEXT), [VkPhysicalDeviceMeshShaderFeaturesEXT](features.html#VkPhysicalDeviceMeshShaderFeaturesEXT), [VkPhysicalDeviceMeshShaderFeaturesNV](features.html#VkPhysicalDeviceMeshShaderFeaturesNV), [VkPhysicalDeviceMultiDrawFeaturesEXT](features.html#VkPhysicalDeviceMultiDrawFeaturesEXT), [VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT](features.html#VkPhysicalDeviceMultisampledRenderToSingleSampledFeaturesEXT), [VkPhysicalDeviceMultiviewFeatures](features.html#VkPhysicalDeviceMultiviewFeatures), [VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM](features.html#VkPhysicalDeviceMultiviewPerViewRenderAreasFeaturesQCOM), [VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM](features.html#VkPhysicalDeviceMultiviewPerViewViewportsFeaturesQCOM), [VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT](features.html#VkPhysicalDeviceMutableDescriptorTypeFeaturesEXT), [VkPhysicalDeviceNestedCommandBufferFeaturesEXT](features.html#VkPhysicalDeviceNestedCommandBufferFeaturesEXT), [VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT](features.html#VkPhysicalDeviceNonSeamlessCubeMapFeaturesEXT), [VkPhysicalDeviceOpacityMicromapFeaturesEXT](features.html#VkPhysicalDeviceOpacityMicromapFeaturesEXT), [VkPhysicalDeviceOpticalFlowFeaturesNV](features.html#VkPhysicalDeviceOpticalFlowFeaturesNV), [VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT](features.html#VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT), [VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV](features.html#VkPhysicalDevicePartitionedAccelerationStructureFeaturesNV), [VkPhysicalDevicePerStageDescriptorSetFeaturesNV](features.html#VkPhysicalDevicePerStageDescriptorSetFeaturesNV), [VkPhysicalDevicePerformanceCountersByRegionFeaturesARM](features.html#VkPhysicalDevicePerformanceCountersByRegionFeaturesARM), [VkPhysicalDevicePerformanceQueryFeaturesKHR](features.html#VkPhysicalDevicePerformanceQueryFeaturesKHR), [VkPhysicalDevicePipelineBinaryFeaturesKHR](features.html#VkPhysicalDevicePipelineBinaryFeaturesKHR), [VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC](../appendices/extensions.html#VkPhysicalDevicePipelineCacheIncrementalModeFeaturesSEC), [VkPhysicalDevicePipelineCreationCacheControlFeatures](features.html#VkPhysicalDevicePipelineCreationCacheControlFeatures), [VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR](features.html#VkPhysicalDevicePipelineExecutablePropertiesFeaturesKHR), [VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT](features.html#VkPhysicalDevicePipelineLibraryGroupHandlesFeaturesEXT), [VkPhysicalDevicePipelineOpacityMicromapFeaturesARM](features.html#VkPhysicalDevicePipelineOpacityMicromapFeaturesARM), [VkPhysicalDevicePipelinePropertiesFeaturesEXT](features.html#VkPhysicalDevicePipelinePropertiesFeaturesEXT), [VkPhysicalDevicePipelineProtectedAccessFeatures](features.html#VkPhysicalDevicePipelineProtectedAccessFeatures), [VkPhysicalDevicePipelineRobustnessFeatures](features.html#VkPhysicalDevicePipelineRobustnessFeatures), [VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR), [VkPhysicalDevicePresentBarrierFeaturesNV](features.html#VkPhysicalDevicePresentBarrierFeaturesNV), [VkPhysicalDevicePresentId2FeaturesKHR](features.html#VkPhysicalDevicePresentId2FeaturesKHR), [VkPhysicalDevicePresentIdFeaturesKHR](features.html#VkPhysicalDevicePresentIdFeaturesKHR), [VkPhysicalDevicePresentMeteringFeaturesNV](features.html#VkPhysicalDevicePresentMeteringFeaturesNV), [VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR](features.html#VkPhysicalDevicePresentModeFifoLatestReadyFeaturesKHR), [VkPhysicalDevicePresentTimingFeaturesEXT](features.html#VkPhysicalDevicePresentTimingFeaturesEXT), [VkPhysicalDevicePresentWait2FeaturesKHR](features.html#VkPhysicalDevicePresentWait2FeaturesKHR), [VkPhysicalDevicePresentWaitFeaturesKHR](features.html#VkPhysicalDevicePresentWaitFeaturesKHR), [VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT](features.html#VkPhysicalDevicePrimitiveTopologyListRestartFeaturesEXT), [VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT](features.html#VkPhysicalDevicePrimitivesGeneratedQueryFeaturesEXT), [VkPhysicalDevicePrivateDataFeatures](features.html#VkPhysicalDevicePrivateDataFeatures), [VkPhysicalDeviceProtectedMemoryFeatures](features.html#VkPhysicalDeviceProtectedMemoryFeatures), [VkPhysicalDeviceProvokingVertexFeaturesEXT](features.html#VkPhysicalDeviceProvokingVertexFeaturesEXT), [VkPhysicalDevicePushConstantBankFeaturesNV](features.html#VkPhysicalDevicePushConstantBankFeaturesNV), [VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT](features.html#VkPhysicalDeviceRGBA10X6FormatsFeaturesEXT), [VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT](features.html#VkPhysicalDeviceRasterizationOrderAttachmentAccessFeaturesEXT), [VkPhysicalDeviceRawAccessChainsFeaturesNV](features.html#VkPhysicalDeviceRawAccessChainsFeaturesNV), [VkPhysicalDeviceRayQueryFeaturesKHR](features.html#VkPhysicalDeviceRayQueryFeaturesKHR), [VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT](features.html#VkPhysicalDeviceRayTracingInvocationReorderFeaturesEXT), [VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV](features.html#VkPhysicalDeviceRayTracingInvocationReorderFeaturesNV), [VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV](features.html#VkPhysicalDeviceRayTracingLinearSweptSpheresFeaturesNV), [VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR](features.html#VkPhysicalDeviceRayTracingMaintenance1FeaturesKHR), [VkPhysicalDeviceRayTracingMotionBlurFeaturesNV](features.html#VkPhysicalDeviceRayTracingMotionBlurFeaturesNV), [VkPhysicalDeviceRayTracingPipelineFeaturesKHR](features.html#VkPhysicalDeviceRayTracingPipelineFeaturesKHR), [VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR](features.html#VkPhysicalDeviceRayTracingPositionFetchFeaturesKHR), [VkPhysicalDeviceRayTracingValidationFeaturesNV](features.html#VkPhysicalDeviceRayTracingValidationFeaturesNV), [VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG](features.html#VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG), [VkPhysicalDeviceRenderPassStripedFeaturesARM](features.html#VkPhysicalDeviceRenderPassStripedFeaturesARM), [VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV](features.html#VkPhysicalDeviceRepresentativeFragmentTestFeaturesNV), [VkPhysicalDeviceRobustness2FeaturesKHR](features.html#VkPhysicalDeviceRobustness2FeaturesKHR), [VkPhysicalDeviceSamplerYcbcrConversionFeatures](features.html#VkPhysicalDeviceSamplerYcbcrConversionFeatures), [VkPhysicalDeviceScalarBlockLayoutFeatures](features.html#VkPhysicalDeviceScalarBlockLayoutFeatures), [VkPhysicalDeviceSchedulingControlsFeaturesARM](features.html#VkPhysicalDeviceSchedulingControlsFeaturesARM), [VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures](features.html#VkPhysicalDeviceSeparateDepthStencilLayoutsFeatures), [VkPhysicalDeviceShader64BitIndexingFeaturesEXT](features.html#VkPhysicalDeviceShader64BitIndexingFeaturesEXT), [VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV](features.html#VkPhysicalDeviceShaderAtomicFloat16VectorFeaturesNV), [VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT](features.html#VkPhysicalDeviceShaderAtomicFloat2FeaturesEXT), [VkPhysicalDeviceShaderAtomicFloatFeaturesEXT](features.html#VkPhysicalDeviceShaderAtomicFloatFeaturesEXT), [VkPhysicalDeviceShaderAtomicInt64Features](features.html#VkPhysicalDeviceShaderAtomicInt64Features), [VkPhysicalDeviceShaderBfloat16FeaturesKHR](features.html#VkPhysicalDeviceShaderBfloat16FeaturesKHR), [VkPhysicalDeviceShaderClockFeaturesKHR](features.html#VkPhysicalDeviceShaderClockFeaturesKHR), [VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM](features.html#VkPhysicalDeviceShaderCoreBuiltinsFeaturesARM), [VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures](features.html#VkPhysicalDeviceShaderDemoteToHelperInvocationFeatures), [VkPhysicalDeviceShaderDrawParametersFeatures](features.html#VkPhysicalDeviceShaderDrawParametersFeatures), [VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD](features.html#VkPhysicalDeviceShaderEarlyAndLateFragmentTestsFeaturesAMD), [VkPhysicalDeviceShaderEnqueueFeaturesAMDX](features.html#VkPhysicalDeviceShaderEnqueueFeaturesAMDX), [VkPhysicalDeviceShaderExpectAssumeFeatures](features.html#VkPhysicalDeviceShaderExpectAssumeFeatures), [VkPhysicalDeviceShaderFloat16Int8Features](features.html#VkPhysicalDeviceShaderFloat16Int8Features), [VkPhysicalDeviceShaderFloat8FeaturesEXT](features.html#VkPhysicalDeviceShaderFloat8FeaturesEXT), [VkPhysicalDeviceShaderFloatControls2Features](features.html#VkPhysicalDeviceShaderFloatControls2Features), [VkPhysicalDeviceShaderFmaFeaturesKHR](features.html#VkPhysicalDeviceShaderFmaFeaturesKHR), [VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT](features.html#VkPhysicalDeviceShaderImageAtomicInt64FeaturesEXT), [VkPhysicalDeviceShaderImageFootprintFeaturesNV](features.html#VkPhysicalDeviceShaderImageFootprintFeaturesNV), [VkPhysicalDeviceShaderInstrumentationFeaturesARM](features.html#VkPhysicalDeviceShaderInstrumentationFeaturesARM), [VkPhysicalDeviceShaderIntegerDotProductFeatures](features.html#VkPhysicalDeviceShaderIntegerDotProductFeatures), [VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL](features.html#VkPhysicalDeviceShaderIntegerFunctions2FeaturesINTEL), [VkPhysicalDeviceShaderLongVectorFeaturesEXT](features.html#VkPhysicalDeviceShaderLongVectorFeaturesEXT), [VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR](features.html#VkPhysicalDeviceShaderMaximalReconvergenceFeaturesKHR), [VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE](features.html#VkPhysicalDeviceShaderMixedFloatDotProductFeaturesVALVE), [VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT](features.html#VkPhysicalDeviceShaderModuleIdentifierFeaturesEXT), [VkPhysicalDeviceShaderObjectFeaturesEXT](features.html#VkPhysicalDeviceShaderObjectFeaturesEXT), [VkPhysicalDeviceShaderQuadControlFeaturesKHR](features.html#VkPhysicalDeviceShaderQuadControlFeaturesKHR), [VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR](features.html#VkPhysicalDeviceShaderRelaxedExtendedInstructionFeaturesKHR), [VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT](features.html#VkPhysicalDeviceShaderReplicatedCompositesFeaturesEXT), [VkPhysicalDeviceShaderSMBuiltinsFeaturesNV](features.html#VkPhysicalDeviceShaderSMBuiltinsFeaturesNV), [VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures](features.html#VkPhysicalDeviceShaderSubgroupExtendedTypesFeatures), [VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT](features.html#VkPhysicalDeviceShaderSubgroupPartitionedFeaturesEXT), [VkPhysicalDeviceShaderSubgroupRotateFeatures](features.html#VkPhysicalDeviceShaderSubgroupRotateFeatures), [VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR](features.html#VkPhysicalDeviceShaderSubgroupUniformControlFlowFeaturesKHR), [VkPhysicalDeviceShaderTerminateInvocationFeatures](features.html#VkPhysicalDeviceShaderTerminateInvocationFeatures), [VkPhysicalDeviceShaderTileImageFeaturesEXT](features.html#VkPhysicalDeviceShaderTileImageFeaturesEXT), [VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT](features.html#VkPhysicalDeviceShaderUniformBufferUnsizedArrayFeaturesEXT), [VkPhysicalDeviceShaderUntypedPointersFeaturesKHR](features.html#VkPhysicalDeviceShaderUntypedPointersFeaturesKHR), [VkPhysicalDeviceShadingRateImageFeaturesNV](features.html#VkPhysicalDeviceShadingRateImageFeaturesNV), [VkPhysicalDeviceSubgroupSizeControlFeatures](features.html#VkPhysicalDeviceSubgroupSizeControlFeatures), [VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT](features.html#VkPhysicalDeviceSubpassMergeFeedbackFeaturesEXT), [VkPhysicalDeviceSubpassShadingFeaturesHUAWEI](features.html#VkPhysicalDeviceSubpassShadingFeaturesHUAWEI), [VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR](features.html#VkPhysicalDeviceSwapchainMaintenance1FeaturesKHR), [VkPhysicalDeviceSynchronization2Features](features.html#VkPhysicalDeviceSynchronization2Features), [VkPhysicalDeviceTensorFeaturesARM](features.html#VkPhysicalDeviceTensorFeaturesARM), [VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT](features.html#VkPhysicalDeviceTexelBufferAlignmentFeaturesEXT), [VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT](features.html#VkPhysicalDeviceTextureCompressionASTC3DFeaturesEXT), [VkPhysicalDeviceTextureCompressionASTCHDRFeatures](features.html#VkPhysicalDeviceTextureCompressionASTCHDRFeatures), [VkPhysicalDeviceTileMemoryHeapFeaturesQCOM](features.html#VkPhysicalDeviceTileMemoryHeapFeaturesQCOM), [VkPhysicalDeviceTilePropertiesFeaturesQCOM](features.html#VkPhysicalDeviceTilePropertiesFeaturesQCOM), [VkPhysicalDeviceTileShadingFeaturesQCOM](features.html#VkPhysicalDeviceTileShadingFeaturesQCOM), [VkPhysicalDeviceTimelineSemaphoreFeatures](features.html#VkPhysicalDeviceTimelineSemaphoreFeatures), [VkPhysicalDeviceTransformFeedbackFeaturesEXT](features.html#VkPhysicalDeviceTransformFeedbackFeaturesEXT), [VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR](features.html#VkPhysicalDeviceUnifiedImageLayoutsFeaturesKHR), [VkPhysicalDeviceUniformBufferStandardLayoutFeatures](features.html#VkPhysicalDeviceUniformBufferStandardLayoutFeatures), [VkPhysicalDeviceVariablePointersFeatures](features.html#VkPhysicalDeviceVariablePointersFeatures), [VkPhysicalDeviceVertexAttributeDivisorFeatures](features.html#VkPhysicalDeviceVertexAttributeDivisorFeatures), [VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT](features.html#VkPhysicalDeviceVertexAttributeRobustnessFeaturesEXT), [VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT](features.html#VkPhysicalDeviceVertexInputDynamicStateFeaturesEXT), [VkPhysicalDeviceVideoDecodeVP9FeaturesKHR](features.html#VkPhysicalDeviceVideoDecodeVP9FeaturesKHR), [VkPhysicalDeviceVideoEncodeAV1FeaturesKHR](features.html#VkPhysicalDeviceVideoEncodeAV1FeaturesKHR), [VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR](features.html#VkPhysicalDeviceVideoEncodeIntraRefreshFeaturesKHR), [VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR](features.html#VkPhysicalDeviceVideoEncodeQuantizationMapFeaturesKHR), [VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE](features.html#VkPhysicalDeviceVideoEncodeRgbConversionFeaturesVALVE), [VkPhysicalDeviceVideoMaintenance1FeaturesKHR](features.html#VkPhysicalDeviceVideoMaintenance1FeaturesKHR), [VkPhysicalDeviceVideoMaintenance2FeaturesKHR](features.html#VkPhysicalDeviceVideoMaintenance2FeaturesKHR), [VkPhysicalDeviceVulkan11Features](features.html#VkPhysicalDeviceVulkan11Features), [VkPhysicalDeviceVulkan12Features](features.html#VkPhysicalDeviceVulkan12Features), [VkPhysicalDeviceVulkan13Features](features.html#VkPhysicalDeviceVulkan13Features), [VkPhysicalDeviceVulkan14Features](features.html#VkPhysicalDeviceVulkan14Features), [VkPhysicalDeviceVulkanMemoryModelFeatures](features.html#VkPhysicalDeviceVulkanMemoryModelFeatures), [VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR](features.html#VkPhysicalDeviceWorkgroupMemoryExplicitLayoutFeaturesKHR), [VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT](features.html#VkPhysicalDeviceYcbcr2Plane444FormatsFeaturesEXT), [VkPhysicalDeviceYcbcrDegammaFeaturesQCOM](features.html#VkPhysicalDeviceYcbcrDegammaFeaturesQCOM), [VkPhysicalDeviceYcbcrImageArraysFeaturesEXT](features.html#VkPhysicalDeviceYcbcrImageArraysFeaturesEXT), [VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT](features.html#VkPhysicalDeviceZeroInitializeDeviceMemoryFeaturesEXT), or [VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures](features.html#VkPhysicalDeviceZeroInitializeWorkgroupMemoryFeatures)

* 
[](#VUID-VkDeviceCreateInfo-sType-unique) VUID-VkDeviceCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkDeviceDeviceMemoryReportCreateInfoEXT](#VkDeviceDeviceMemoryReportCreateInfoEXT) or [VkDevicePrivateDataCreateInfo](#VkDevicePrivateDataCreateInfo)

* 
[](#VUID-VkDeviceCreateInfo-flags-zerobitmask) VUID-VkDeviceCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDeviceCreateInfo-pQueueCreateInfos-parameter) VUID-VkDeviceCreateInfo-pQueueCreateInfos-parameter

 If `queueCreateInfoCount` is not `0`, `pQueueCreateInfos` **must** be a valid pointer to an array of `queueCreateInfoCount` valid [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structures

* 
[](#VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-parameter) VUID-VkDeviceCreateInfo-ppEnabledExtensionNames-parameter

 If `enabledExtensionCount` is not `0`, `ppEnabledExtensionNames` **must** be a valid pointer to an array of `enabledExtensionCount` null-terminated UTF-8 strings

* 
[](#VUID-VkDeviceCreateInfo-pEnabledFeatures-parameter) VUID-VkDeviceCreateInfo-pEnabledFeatures-parameter

 If `pEnabledFeatures` is not `NULL`, `pEnabledFeatures` **must** be a valid pointer to a valid [VkPhysicalDeviceFeatures](features.html#VkPhysicalDeviceFeatures) structure

// Provided by VK_VERSION_1_0
typedef VkFlags VkDeviceCreateFlags;

`VkDeviceCreateFlags` is a bitmask type for setting a mask, but is
currently reserved for future use.

A logical device **can** be created that connects to one or more physical
devices by adding a `VkDeviceGroupDeviceCreateInfo` structure to the
`pNext` chain of [VkDeviceCreateInfo](#VkDeviceCreateInfo).
The `VkDeviceGroupDeviceCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDeviceGroupDeviceCreateInfo {
    VkStructureType            sType;
    const void*                pNext;
    uint32_t                   physicalDeviceCount;
    const VkPhysicalDevice*    pPhysicalDevices;
} VkDeviceGroupDeviceCreateInfo;

// Provided by VK_KHR_device_group_creation
// Equivalent to VkDeviceGroupDeviceCreateInfo
typedef VkDeviceGroupDeviceCreateInfo VkDeviceGroupDeviceCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`physicalDeviceCount` is the number of elements in the
`pPhysicalDevices` array.

* 
`pPhysicalDevices` is a pointer to an array of physical device
handles belonging to the same device group.

The elements of the `pPhysicalDevices` array are an ordered list of the
physical devices that the logical device represents.
These **must** be a subset of a single device group, and need not be in the
same order as they were enumerated.
The order of the physical devices in the `pPhysicalDevices` array
determines the *device index* of each physical device, with element i
being assigned a device index of i.
Certain commands and structures refer to one or more physical devices by
using device indices or *device masks* formed using device indices.

A logical device created without using `VkDeviceGroupDeviceCreateInfo`,
or with `physicalDeviceCount` equal to zero, is equivalent to a
`physicalDeviceCount` of one and `pPhysicalDevices` pointing to the
`physicalDevice` parameter to [vkCreateDevice](#vkCreateDevice).
In particular, the device index of that physical device is zero.

Valid Usage

* 
[](#VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-00375) VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-00375

Each element of `pPhysicalDevices` **must** be unique

* 
[](#VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-00376) VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-00376

All elements of `pPhysicalDevices` **must** be in the same device group
as enumerated by [vkEnumeratePhysicalDeviceGroups](#vkEnumeratePhysicalDeviceGroups)

* 
[](#VUID-VkDeviceGroupDeviceCreateInfo-physicalDeviceCount-00377) VUID-VkDeviceGroupDeviceCreateInfo-physicalDeviceCount-00377

If `physicalDeviceCount` is not `0`, the `physicalDevice`
parameter of [vkCreateDevice](#vkCreateDevice) **must** be an element of
`pPhysicalDevices`

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceGroupDeviceCreateInfo-sType-sType) VUID-VkDeviceGroupDeviceCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_GROUP_DEVICE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-parameter) VUID-VkDeviceGroupDeviceCreateInfo-pPhysicalDevices-parameter

 If `physicalDeviceCount` is not `0`, `pPhysicalDevices` **must** be a valid pointer to an array of `physicalDeviceCount` valid [VkPhysicalDevice](#VkPhysicalDevice) handles

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](#VkDeviceCreateInfo)

To specify whether device memory allocation is allowed beyond the size
reported by [VkPhysicalDeviceMemoryProperties](memory.html#VkPhysicalDeviceMemoryProperties), add a
[VkDeviceMemoryOverallocationCreateInfoAMD](#VkDeviceMemoryOverallocationCreateInfoAMD) structure to the `pNext`
chain of the [VkDeviceCreateInfo](#VkDeviceCreateInfo) structure.
If this structure is not specified, it is as if the
[VK_MEMORY_OVERALLOCATION_BEHAVIOR_DEFAULT_AMD](#VkMemoryOverallocationBehaviorAMD) value is used.

// Provided by VK_AMD_memory_overallocation_behavior
typedef struct VkDeviceMemoryOverallocationCreateInfoAMD {
    VkStructureType                      sType;
    const void*                          pNext;
    VkMemoryOverallocationBehaviorAMD    overallocationBehavior;
} VkDeviceMemoryOverallocationCreateInfoAMD;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`overallocationBehavior` is the desired overallocation behavior.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceMemoryOverallocationCreateInfoAMD-sType-sType) VUID-VkDeviceMemoryOverallocationCreateInfoAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_MEMORY_OVERALLOCATION_CREATE_INFO_AMD](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceMemoryOverallocationCreateInfoAMD-overallocationBehavior-parameter) VUID-VkDeviceMemoryOverallocationCreateInfoAMD-overallocationBehavior-parameter

 `overallocationBehavior` **must** be a valid [VkMemoryOverallocationBehaviorAMD](#VkMemoryOverallocationBehaviorAMD) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](#VkDeviceCreateInfo)

Possible values for
[VkDeviceMemoryOverallocationCreateInfoAMD](#VkDeviceMemoryOverallocationCreateInfoAMD)::`overallocationBehavior`
include:

// Provided by VK_AMD_memory_overallocation_behavior
typedef enum VkMemoryOverallocationBehaviorAMD {
    VK_MEMORY_OVERALLOCATION_BEHAVIOR_DEFAULT_AMD = 0,
    VK_MEMORY_OVERALLOCATION_BEHAVIOR_ALLOWED_AMD = 1,
    VK_MEMORY_OVERALLOCATION_BEHAVIOR_DISALLOWED_AMD = 2,
} VkMemoryOverallocationBehaviorAMD;

* 
[VK_MEMORY_OVERALLOCATION_BEHAVIOR_DEFAULT_AMD](#VkMemoryOverallocationBehaviorAMD) lets the
implementation decide if overallocation is allowed.

* 
[VK_MEMORY_OVERALLOCATION_BEHAVIOR_ALLOWED_AMD](#VkMemoryOverallocationBehaviorAMD) specifies
overallocation is allowed if platform permits.

* 
[VK_MEMORY_OVERALLOCATION_BEHAVIOR_DISALLOWED_AMD](#VkMemoryOverallocationBehaviorAMD) specifies the
application is not allowed to allocate device memory beyond the heap
sizes reported by [VkPhysicalDeviceMemoryProperties](memory.html#VkPhysicalDeviceMemoryProperties).
Allocations that are not explicitly made by the application within the
scope of the Vulkan instance are not accounted for.

When using the Nsight™ Aftermath SDK, to configure how device crash
dumps are created, add a [VkDeviceDiagnosticsConfigCreateInfoNV](#VkDeviceDiagnosticsConfigCreateInfoNV)
structure to the `pNext` chain of the [VkDeviceCreateInfo](#VkDeviceCreateInfo)
structure.

// Provided by VK_NV_device_diagnostics_config
typedef struct VkDeviceDiagnosticsConfigCreateInfoNV {
    VkStructureType                     sType;
    const void*                         pNext;
    VkDeviceDiagnosticsConfigFlagsNV    flags;
} VkDeviceDiagnosticsConfigCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkDeviceDiagnosticsConfigFlagBitsNV](#VkDeviceDiagnosticsConfigFlagBitsNV)
specifying additional parameters for configuring diagnostic tools.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceDiagnosticsConfigCreateInfoNV-sType-sType) VUID-VkDeviceDiagnosticsConfigCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_DIAGNOSTICS_CONFIG_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceDiagnosticsConfigCreateInfoNV-flags-parameter) VUID-VkDeviceDiagnosticsConfigCreateInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkDeviceDiagnosticsConfigFlagBitsNV](#VkDeviceDiagnosticsConfigFlagBitsNV) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](#VkDeviceCreateInfo)

Bits which **can** be set in
[VkDeviceDiagnosticsConfigCreateInfoNV](#VkDeviceDiagnosticsConfigCreateInfoNV)::`flags` include:

// Provided by VK_NV_device_diagnostics_config
typedef enum VkDeviceDiagnosticsConfigFlagBitsNV {
    VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_SHADER_DEBUG_INFO_BIT_NV = 0x00000001,
    VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_RESOURCE_TRACKING_BIT_NV = 0x00000002,
    VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_AUTOMATIC_CHECKPOINTS_BIT_NV = 0x00000004,
    VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_SHADER_ERROR_REPORTING_BIT_NV = 0x00000008,
} VkDeviceDiagnosticsConfigFlagBitsNV;

* 
[VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_SHADER_DEBUG_INFO_BIT_NV](#VkDeviceDiagnosticsConfigFlagBitsNV)
enables the generation of debug information for shaders.

* 
[VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_RESOURCE_TRACKING_BIT_NV](#VkDeviceDiagnosticsConfigFlagBitsNV)
enables driver side tracking of resources (images, buffers, etc.) used
to augment the device fault information.

* 
[VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_AUTOMATIC_CHECKPOINTS_BIT_NV](#VkDeviceDiagnosticsConfigFlagBitsNV)
enables automatic insertion of [    diagnostic checkpoints](debugging.html#device-diagnostic-checkpoints) for draw calls, dispatches,
trace rays,
and copies.
The CPU call stack at the time of the command will be associated as the
marker data for the automatically inserted checkpoints.

* 
[VK_DEVICE_DIAGNOSTICS_CONFIG_ENABLE_SHADER_ERROR_REPORTING_BIT_NV](#VkDeviceDiagnosticsConfigFlagBitsNV)
enables shader error reporting.

// Provided by VK_NV_device_diagnostics_config
typedef VkFlags VkDeviceDiagnosticsConfigFlagsNV;

`VkDeviceDiagnosticsConfigFlagsNV` is a bitmask type for setting a mask
of zero or more [VkDeviceDiagnosticsConfigFlagBitsNV](#VkDeviceDiagnosticsConfigFlagBitsNV).

To register callbacks for underlying device memory events of type
[VkDeviceMemoryReportEventTypeEXT](#VkDeviceMemoryReportEventTypeEXT), add one or multiple
[VkDeviceDeviceMemoryReportCreateInfoEXT](#VkDeviceDeviceMemoryReportCreateInfoEXT) structures to the `pNext`
chain of the [VkDeviceCreateInfo](#VkDeviceCreateInfo) structure.

// Provided by VK_EXT_device_memory_report
typedef struct VkDeviceDeviceMemoryReportCreateInfoEXT {
    VkStructureType                        sType;
    const void*                            pNext;
    VkDeviceMemoryReportFlagsEXT           flags;
    PFN_vkDeviceMemoryReportCallbackEXT    pfnUserCallback;
    void*                                  pUserData;
} VkDeviceDeviceMemoryReportCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is 0 and reserved for future use.

* 
`pfnUserCallback` is the application callback function to call.

* 
`pUserData` is NULL or an application-defined user data pointer to
be passed to the callback.

The callback **may** be called from multiple threads simultaneously.

The callback **must** be called only once by the implementation when a
[VkDeviceMemoryReportEventTypeEXT](#VkDeviceMemoryReportEventTypeEXT) event occurs.

|  | The callback could be called from a background thread other than the thread
| --- | --- |
calling the Vulkan commands. |

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-sType-sType) VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_DEVICE_MEMORY_REPORT_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-flags-zerobitmask) VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-pfnUserCallback-parameter) VUID-VkDeviceDeviceMemoryReportCreateInfoEXT-pfnUserCallback-parameter

 `pfnUserCallback` **must** be a valid [PFN_vkDeviceMemoryReportCallbackEXT](#PFN_vkDeviceMemoryReportCallbackEXT) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](#VkDeviceCreateInfo)

The prototype for the
[VkDeviceDeviceMemoryReportCreateInfoEXT](#VkDeviceDeviceMemoryReportCreateInfoEXT)::`pfnUserCallback`
function implemented by the application is:

// Provided by VK_EXT_device_memory_report
typedef void (*PFN_vkDeviceMemoryReportCallbackEXT)(
    const VkDeviceMemoryReportCallbackDataEXT*  pCallbackData,
    void*                                       pUserData);

* 
`pCallbackData` contains all the callback related data in the
[VkDeviceMemoryReportCallbackDataEXT](#VkDeviceMemoryReportCallbackDataEXT) structure.

* 
`pUserData` is the application-defined user data pointer, equal to
the value of
[VkDeviceDeviceMemoryReportCreateInfoEXT](#VkDeviceDeviceMemoryReportCreateInfoEXT)::`pUserData` specified
when the [VkDevice](#VkDevice) object was created.

The callback **must** not make calls to any Vulkan commands.

The definition of `VkDeviceMemoryReportCallbackDataEXT` is:

// Provided by VK_EXT_device_memory_report
typedef struct VkDeviceMemoryReportCallbackDataEXT {
    VkStructureType                     sType;
    void*                               pNext;
    VkDeviceMemoryReportFlagsEXT        flags;
    VkDeviceMemoryReportEventTypeEXT    type;
    uint64_t                            memoryObjectId;
    VkDeviceSize                        size;
    VkObjectType                        objectType;
    uint64_t                            objectHandle;
    uint32_t                            heapIndex;
} VkDeviceMemoryReportCallbackDataEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is 0 and reserved for future use.

* 
`type` is a [VkDeviceMemoryReportEventTypeEXT](#VkDeviceMemoryReportEventTypeEXT) type specifying
the type of event reported in this
`VkDeviceMemoryReportCallbackDataEXT` structure.

* 
`memoryObjectId` is the unique id for the underlying memory object
as described below.

* 
`size` is the size of the memory object in bytes.
If `type` is [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](#VkDeviceMemoryReportEventTypeEXT),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT](#VkDeviceMemoryReportEventTypeEXT) or
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATION_FAILED_EXT](#VkDeviceMemoryReportEventTypeEXT),
`size` is a valid `VkDeviceSize` value.
Otherwise, `size` is **undefined**.

* 
`objectType` is a [VkObjectType](debugging.html#VkObjectType) value specifying the type of
the object associated with this device memory report event.
If `type` is [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](#VkDeviceMemoryReportEventTypeEXT),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_FREE_EXT](#VkDeviceMemoryReportEventTypeEXT),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT](#VkDeviceMemoryReportEventTypeEXT),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_UNIMPORT_EXT](#VkDeviceMemoryReportEventTypeEXT) or
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATION_FAILED_EXT](#VkDeviceMemoryReportEventTypeEXT),
`objectType` is a valid [VkObjectType](debugging.html#VkObjectType) enum.
Otherwise, `objectType` is **undefined**.

* 
`objectHandle` is the object this device memory report event is
attributed to.
If `type` is [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](#VkDeviceMemoryReportEventTypeEXT),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_FREE_EXT](#VkDeviceMemoryReportEventTypeEXT),
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT](#VkDeviceMemoryReportEventTypeEXT) or
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_UNIMPORT_EXT](#VkDeviceMemoryReportEventTypeEXT),
`objectHandle` is a valid Vulkan handle of the type associated with
`objectType` as defined in the [    `VkObjectType` and Vulkan Handle Relationship](debugging.html#debugging-object-types) table.
Otherwise, `objectHandle` is **undefined**.

* 
`heapIndex` describes which memory heap this device memory
allocation is made from.
If `type` is [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](#VkDeviceMemoryReportEventTypeEXT)
or [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATION_FAILED_EXT](#VkDeviceMemoryReportEventTypeEXT),
`heapIndex` corresponds to one of the valid heaps from the
[VkPhysicalDeviceMemoryProperties](memory.html#VkPhysicalDeviceMemoryProperties) structure.
Otherwise, `heapIndex` is **undefined**.

`memoryObjectId` is used to avoid double-counting on the same memory
object.

If an internally-allocated device memory object or a [VkDeviceMemory](memory.html#VkDeviceMemory)
**cannot** be exported, `memoryObjectId` **must** be unique in the
[VkDevice](#VkDevice).

If an internally-allocated device memory object or a [VkDeviceMemory](memory.html#VkDeviceMemory)
supports being exported, `memoryObjectId` **must** be unique system wide.

If an internal device memory object or a [VkDeviceMemory](memory.html#VkDeviceMemory) is backed by
an imported external memory object, `memoryObjectId` **must** be unique
system wide.

|  | This structure should only be considered valid during the lifetime of the
| --- | --- |
triggered callback.

For [VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](#VkDeviceMemoryReportEventTypeEXT) and
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT](#VkDeviceMemoryReportEventTypeEXT) events,
`objectHandle` usually will not yet exist when the application or tool
receives the callback.
`objectHandle` will only exist when the create or allocate call that
triggered the event returns, and if the allocation or import ends up failing
`objectHandle` will not ever exist. |

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceMemoryReportCallbackDataEXT-sType-sType) VUID-VkDeviceMemoryReportCallbackDataEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_MEMORY_REPORT_CALLBACK_DATA_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceMemoryReportCallbackDataEXT-pNext-pNext) VUID-VkDeviceMemoryReportCallbackDataEXT-pNext-pNext

 `pNext` **must** be `NULL`

// Provided by VK_EXT_device_memory_report
typedef VkFlags VkDeviceMemoryReportFlagsEXT;

`VkDeviceMemoryReportFlagsEXT` is a bitmask type for setting a mask, but
is currently reserved for future use.

Possible values of [VkDeviceMemoryReportCallbackDataEXT](#VkDeviceMemoryReportCallbackDataEXT)::`type`,
specifying event types which cause the device driver to call the callback,
are:

// Provided by VK_EXT_device_memory_report
typedef enum VkDeviceMemoryReportEventTypeEXT {
    VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT = 0,
    VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_FREE_EXT = 1,
    VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT = 2,
    VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_UNIMPORT_EXT = 3,
    VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATION_FAILED_EXT = 4,
} VkDeviceMemoryReportEventTypeEXT;

* 
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATE_EXT](#VkDeviceMemoryReportEventTypeEXT) specifies this
event corresponds to the allocation of an internal device memory object
or a [VkDeviceMemory](memory.html#VkDeviceMemory).

* 
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_FREE_EXT](#VkDeviceMemoryReportEventTypeEXT) specifies this event
corresponds to the deallocation of an internally-allocated device memory
object or a [VkDeviceMemory](memory.html#VkDeviceMemory).

* 
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_IMPORT_EXT](#VkDeviceMemoryReportEventTypeEXT) specifies this event
corresponds to the import of an external memory object.

* 
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_UNIMPORT_EXT](#VkDeviceMemoryReportEventTypeEXT) specifies this
event is the release of an imported external memory object.

* 
[VK_DEVICE_MEMORY_REPORT_EVENT_TYPE_ALLOCATION_FAILED_EXT](#VkDeviceMemoryReportEventTypeEXT) specifies
this event corresponds to the failed allocation of an internal device
memory object or a [VkDeviceMemory](memory.html#VkDeviceMemory).

To reserve private data storage slots, add a
[VkDevicePrivateDataCreateInfo](#VkDevicePrivateDataCreateInfo) structure to the `pNext` chain of
the [VkDeviceCreateInfo](#VkDeviceCreateInfo) structure.
Reserving slots in this manner is not strictly necessary, but doing so **may**
improve performance.

// Provided by VK_VERSION_1_3
typedef struct VkDevicePrivateDataCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           privateDataSlotRequestCount;
} VkDevicePrivateDataCreateInfo;

// Provided by VK_EXT_private_data
// Equivalent to VkDevicePrivateDataCreateInfo
typedef VkDevicePrivateDataCreateInfo VkDevicePrivateDataCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`privateDataSlotRequestCount` is the amount of slots to reserve.

Valid Usage (Implicit)

* 
[](#VUID-VkDevicePrivateDataCreateInfo-sType-sType) VUID-VkDevicePrivateDataCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_PRIVATE_DATA_CREATE_INFO](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](#VkDeviceCreateInfo)

To disable the implementation’s internal pipeline cache, add a
[VkDevicePipelineBinaryInternalCacheControlKHR](#VkDevicePipelineBinaryInternalCacheControlKHR) structure to the
`pNext` chain of the [VkDeviceCreateInfo](#VkDeviceCreateInfo) structure.

// Provided by VK_KHR_pipeline_binary
typedef struct VkDevicePipelineBinaryInternalCacheControlKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           disableInternalCache;
} VkDevicePipelineBinaryInternalCacheControlKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`disableInternalCache` specifies whether or not to disable the
implementation’s internal pipeline cache.

If the `VkDeviceCreateInfo`::`pNext` chain does not include this
structure, then `disableInternalCache` defaults to [VK_FALSE](fundamentals.html#VK_FALSE).

Valid Usage

* 
[](#VUID-VkDevicePipelineBinaryInternalCacheControlKHR-disableInternalCache-09602) VUID-VkDevicePipelineBinaryInternalCacheControlKHR-disableInternalCache-09602

If
[VkPhysicalDevicePipelineBinaryPropertiesKHR](limits.html#VkPhysicalDevicePipelineBinaryPropertiesKHR)::`pipelineBinaryInternalCacheControl`
is [VK_FALSE](fundamentals.html#VK_FALSE), `disableInternalCache` **must** be [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkDevicePipelineBinaryInternalCacheControlKHR-sType-sType) VUID-VkDevicePipelineBinaryInternalCacheControlKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_PIPELINE_BINARY_INTERNAL_CACHE_CONTROL_KHR](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](#VkDeviceCreateInfo)

The number of shader cores used by all the queues of a device **can** be
controlled by adding a `VkDeviceQueueShaderCoreControlCreateInfoARM`
structure to the `pNext` chain of the [VkDeviceCreateInfo](#VkDeviceCreateInfo)
structure.

The following is a high-level list of `VkDevice` uses along with
references on where to find more information:

* 
Creation of queues.
See the [Queues](#devsandqueues-queues) section below for further
details.

* 
Creation and tracking of various synchronization constructs.
See [Synchronization and Cache Control](synchronization.html#synchronization) for further
details.

* 
Allocating, freeing, and managing memory.
See [Memory Allocation](memory.html#memory) and [Resource Creation](resources.html#resources) for
further details.

* 
Creation and destruction of command buffers and command buffer pools.
See [Command Buffers](cmdbuffers.html#commandbuffers) for further details.

* 
Creation, destruction, and management of graphics state.
See [Pipelines](pipelines.html#pipelines) and [Resource Descriptors](descriptorsets.html#descriptors),
among others, for further details.

A logical device **may** become *lost* for a number of implementation-specific
reasons, indicating that pending and future command execution **may** fail and
cause resources and backing memory to become **undefined**.

|  | Typical reasons for device loss will include things like execution timing
| --- | --- |
out (to prevent denial of service), power management events, platform
resource management, implementation errors.

Applications not adhering to [valid usage](fundamentals.html#fundamentals-validusage) may
also result in device loss being reported, however this is not guaranteed.
Even if device loss is reported, the system may be in an unrecoverable
state, and further usage of the API is still considered invalid. |

When this happens, certain commands will return [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult).
After any such event, the logical device is considered *lost*.
It is not possible to reset the logical device to a non-lost state, however
the lost state is specific to a logical device (`VkDevice`), and the
corresponding physical device (`VkPhysicalDevice`) **may** be otherwise
unaffected.

In some cases, the physical device **may** also be lost, and attempting to
create a new logical device will fail, returning [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult).
This is usually indicative of a problem with the underlying implementation,
or its connection to the host.
If the physical device has not been lost, and a new logical device is
successfully created from that physical device, it **must** be in the non-lost
state.

|  | Whilst logical device loss **may** be recoverable, in the case of physical
| --- | --- |
device loss, it is unlikely that an application will be able to recover
unless additional, unaffected physical devices exist on the system.
The error is largely informational and intended only to inform the
application that a platform issue has occurred, and **should** be investigated
further.
For example, underlying hardware **may** have developed a fault or become
physically disconnected from the rest of the system.
In many cases, physical device loss **may** cause other more serious issues
such as the operating system crashing; in which case it **may** not be reported
via the Vulkan API. |

When a device is lost, its child objects are not implicitly destroyed and
their handles are still valid.
Those objects **must** still be destroyed before their parents or the device
**can** be destroyed (see the [Object Lifetime](fundamentals.html#fundamentals-objectmodel-lifetime) section).
The host address space corresponding to device memory mapped using
[vkMapMemory](memory.html#vkMapMemory) is still valid, and host memory accesses to these mapped
regions are still valid, but the contents are **undefined**.
It is still legal to call any API command on the device and child objects.

Once a device is lost, command execution **may** fail, and certain commands
that return a [VkResult](fundamentals.html#VkResult) **may** return [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult).
These commands can be identified by the inclusion of
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) in the Return Codes section for each command.
Commands that do not allow runtime errors **must** still operate correctly for
valid usage and, if applicable, return valid data.

Commands that wait indefinitely for device execution (namely
[vkDeviceWaitIdle](synchronization.html#vkDeviceWaitIdle), [vkQueueWaitIdle](synchronization.html#vkQueueWaitIdle), [vkWaitForFences](synchronization.html#vkWaitForFences)
or [vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR)
with a maximum `timeout`, and [vkGetQueryPoolResults](queries.html#vkGetQueryPoolResults) with the
[VK_QUERY_RESULT_WAIT_BIT](queries.html#VkQueryResultFlagBits) bit set in `flags`) **must** return in
finite time even in the case of a lost device, and return either
[VK_SUCCESS](fundamentals.html#VkResult) or [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult).
For any command that **may** return [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult), for the purpose
of determining whether a command buffer is in the
[pending state](cmdbuffers.html#commandbuffers-lifecycle), or whether resources are
considered in-use by the device, a return value of
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) is equivalent to [VK_SUCCESS](fundamentals.html#VkResult).

If a device was created with the [`maintenance5`](features.html#features-maintenance5) feature enabled, and any device command returns
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult), then all device commands for which
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) is a valid return value and which happen-after it
on the same host thread **must** return [VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult).

Device commands executing on other threads **must** begin returning
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult) within finite time.

The content of any external memory objects that have been exported from or
imported to a lost device become **undefined**.
Objects on other logical devices or in other APIs which are associated with
the same underlying memory resource as the external memory objects on the
lost device are unaffected other than their content becoming **undefined**.
The layout of subresources of images on other logical devices that are bound
to `VkDeviceMemory` objects associated with the same underlying memory
resources as external memory objects on the lost device becomes
[VK_IMAGE_LAYOUT_UNDEFINED](resources.html#VkImageLayout).

The state of `VkSemaphore` objects on other logical devices created by
[importing a semaphore payload](synchronization.html#synchronization-semaphores-importing) with
temporary permanence which was exported from the lost device is **undefined**.
The state of `VkSemaphore` objects on other logical devices that
permanently share a semaphore payload with a `VkSemaphore` object on the
lost device is **undefined**, and remains **undefined** following any subsequent
signal operations.
Implementations **must** ensure pending and subsequently submitted wait
operations on such semaphores behave as defined in
[Semaphore State Requirements For Wait Operations](synchronization.html#synchronization-semaphores-waiting-state) for external semaphores not in a valid state for a wait
operation.

To destroy a device, call:

// Provided by VK_VERSION_1_0
void vkDestroyDevice(
    VkDevice                                    device,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

To ensure that no work is active on the device, [vkDeviceWaitIdle](synchronization.html#vkDeviceWaitIdle) **can**
be used to gate the destruction of the device.
Prior to destroying a device, an application is responsible for
destroying/freeing any Vulkan objects with explicit `vkDestroy*` or
`vkFree*` commands that were created using that device as the first
parameter of the corresponding `vkCreate*` or `vkAllocate*` command.

|  | The lifetime of each of these objects is bound by the lifetime of the
| --- | --- |
`VkDevice` object.
Therefore, to avoid resource leaks, it is critical that an application
explicitly free all of these resources prior to calling
`vkDestroyDevice`. |

Valid Usage

* 
[](#VUID-vkDestroyDevice-device-05137) VUID-vkDestroyDevice-device-05137

All child objects created on `device` that can be destroyed or freed
**must** have been destroyed or freed prior to destroying `device`

* 
[](#VUID-vkDestroyDevice-device-00379) VUID-vkDestroyDevice-device-00379

If `VkAllocationCallbacks` were provided when `device` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDevice-device-00380) VUID-vkDestroyDevice-device-00380

If no `VkAllocationCallbacks` were provided when `device` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDevice-device-parameter) VUID-vkDestroyDevice-device-parameter

 If `device` is not `NULL`, `device` **must** be a valid [VkDevice](#VkDevice) handle

* 
[](#VUID-vkDestroyDevice-pAllocator-parameter) VUID-vkDestroyDevice-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

Host Synchronization

* 
Host access to `device` **must** be externally synchronized

* 
Host access to all `VkQueue` objects created from `device` **must** be externally synchronized

As discussed in the [Physical Device Enumeration](#devsandqueues-physical-device-enumeration) section above, the
[vkGetPhysicalDeviceQueueFamilyProperties](#vkGetPhysicalDeviceQueueFamilyProperties) command is used to retrieve
details about the queue families and queues supported by a device.

Each index in the `pQueueFamilyProperties` array returned by
[vkGetPhysicalDeviceQueueFamilyProperties](#vkGetPhysicalDeviceQueueFamilyProperties) describes a unique queue
family on that physical device.
These indices are used when creating queues, and they correspond directly
with the `queueFamilyIndex` that is passed to the [vkCreateDevice](#vkCreateDevice)
command via the [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structure as described in the
[Queue Creation](#devsandqueues-queue-creation) section below.

Grouping of queue families within a physical device is
implementation-dependent.

|  | The general expectation is that a physical device groups all queues of
| --- | --- |
matching capabilities into a single family.
However, while implementations **should** do this, it is possible that a
physical device **may** return two separate queue families with the same
capabilities. |

Once an application has identified a physical device with the queue(s) that
it desires to use, it will create those queues in conjunction with a logical
device.
This is described in the following section.

Creating a logical device also creates the queues associated with that
device.
The queues to create are described by a set of [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)
structures that are passed to [vkCreateDevice](#vkCreateDevice) in
`pQueueCreateInfos`.
Queues **cannot** be independently destroyed, and are instead destroyed with
the [VkDevice](#VkDevice) that they were created from.

Queues are represented by `VkQueue` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_HANDLE(VkQueue)

The `VkDeviceQueueCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDeviceQueueCreateInfo {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceQueueCreateFlags    flags;
    uint32_t                    queueFamilyIndex;
    uint32_t                    queueCount;
    const float*                pQueuePriorities;
} VkDeviceQueueCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask indicating behavior of the queues.

* 
`queueFamilyIndex` is an unsigned integer indicating the index of
the queue family in which to create the queues on this device.
This index corresponds to the index of an element of the
`pQueueFamilyProperties` array that was returned by
`vkGetPhysicalDeviceQueueFamilyProperties`.

* 
`queueCount` is an unsigned integer specifying the number of queues
to create in the queue family indicated by `queueFamilyIndex`, and
with the behavior specified by `flags`.

* 
`pQueuePriorities` is a pointer to an array of `queueCount`
normalized floating-point values, specifying priorities of work that
will be submitted to each created queue.
See [Queue Priority](#devsandqueues-priority) for more information.

Some queue families support functionality which requires a device feature or
extension to be enabled, as indicated by the
[VkQueueFamilyProperties](#VkQueueFamilyProperties)::`queueFlags` member.
Applications **may** create such queues and submit [queue submission commands](#devsandqueues-submission) to them without enabling the corresponding
feature or extension, but **must** not utilize the specific functionality that
they did not enable.

For example, [sparse memory management operations](sparsemem.html#sparsememory) **can** be
performed on queues from queue families exposing the
[VK_QUEUE_SPARSE_BINDING_BIT](#VkQueueFlagBits) bit, provided the
[sparseBinding](features.html#features-sparseBinding) feature is enabled.
If a queue family supports both the [VK_QUEUE_SPARSE_BINDING_BIT](#VkQueueFlagBits) and
[VK_QUEUE_TRANSFER_BIT](#VkQueueFlagBits) bits, applications **may** create a queue from this
family and issue transfer operations without enabling the
[sparseBinding](features.html#features-sparseBinding) feature.

Valid Usage

* 
[](#VUID-VkDeviceQueueCreateInfo-queueFamilyIndex-00381) VUID-VkDeviceQueueCreateInfo-queueFamilyIndex-00381

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties`

* 
[](#VUID-VkDeviceQueueCreateInfo-queueCount-00382) VUID-VkDeviceQueueCreateInfo-queueCount-00382

`queueCount` **must** be less than or equal to the `queueCount`
member of the `VkQueueFamilyProperties` structure, as returned by
`vkGetPhysicalDeviceQueueFamilyProperties` in the
`pQueueFamilyProperties`[queueFamilyIndex]

* 
[](#VUID-VkDeviceQueueCreateInfo-pQueuePriorities-00383) VUID-VkDeviceQueueCreateInfo-pQueuePriorities-00383

Each element of `pQueuePriorities` **must** be between `0.0` and `1.0`
inclusive

* 
[](#VUID-VkDeviceQueueCreateInfo-flags-02861) VUID-VkDeviceQueueCreateInfo-flags-02861

If the [`protectedMemory`](features.html#features-protectedMemory) feature is
not enabled, the [VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](#VkDeviceQueueCreateFlagBits) bit of
`flags` **must** not be set

* 
[](#VUID-VkDeviceQueueCreateInfo-flags-06449) VUID-VkDeviceQueueCreateInfo-flags-06449

If `flags` includes [VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](#VkDeviceQueueCreateFlagBits),
`queueFamilyIndex` **must** be the index of a queue family that
includes the [VK_QUEUE_PROTECTED_BIT](#VkQueueFlagBits) capability

* 
[](#VUID-VkDeviceQueueCreateInfo-pNext-09398) VUID-VkDeviceQueueCreateInfo-pNext-09398

If the `pNext` chain includes a
[VkDeviceQueueShaderCoreControlCreateInfoARM](#VkDeviceQueueShaderCoreControlCreateInfoARM) structure then
[VkPhysicalDeviceSchedulingControlsPropertiesARM](#VkPhysicalDeviceSchedulingControlsPropertiesARM)::`schedulingControlsFlags`
**must** contain
[VK_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_SHADER_CORE_COUNT_ARM](#VkPhysicalDeviceSchedulingControlsFlagBitsARM)

* 
[](#VUID-VkDeviceQueueCreateInfo-internallySynchronizedQueues-12348) VUID-VkDeviceQueueCreateInfo-internallySynchronizedQueues-12348

If the [    `internallySynchronizedQueues`](features.html#features-internallySynchronizedQueues) feature is not enabled, `flags`
**must** not include
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](#VkDeviceQueueCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceQueueCreateInfo-sType-sType) VUID-VkDeviceQueueCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_QUEUE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceQueueCreateInfo-pNext-pNext) VUID-VkDeviceQueueCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceQueueGlobalPriorityCreateInfo](#VkDeviceQueueGlobalPriorityCreateInfo) or [VkDeviceQueueShaderCoreControlCreateInfoARM](#VkDeviceQueueShaderCoreControlCreateInfoARM)

* 
[](#VUID-VkDeviceQueueCreateInfo-sType-unique) VUID-VkDeviceQueueCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDeviceQueueCreateInfo-flags-parameter) VUID-VkDeviceQueueCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkDeviceQueueCreateFlagBits](#VkDeviceQueueCreateFlagBits) values

* 
[](#VUID-VkDeviceQueueCreateInfo-pQueuePriorities-parameter) VUID-VkDeviceQueueCreateInfo-pQueuePriorities-parameter

 `pQueuePriorities` **must** be a valid pointer to an array of `queueCount` `float` values

* 
[](#VUID-VkDeviceQueueCreateInfo-queueCount-arraylength) VUID-VkDeviceQueueCreateInfo-queueCount-arraylength

 `queueCount` **must** be greater than `0`

Bits which **can** be set in [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)::`flags`,
specifying usage behavior of a queue, are:

// Provided by VK_VERSION_1_1
typedef enum VkDeviceQueueCreateFlagBits {
  // Provided by VK_VERSION_1_1
    VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT = 0x00000001,
  // Provided by VK_KHR_internally_synchronized_queues
    VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR = 0x00000004,
} VkDeviceQueueCreateFlagBits;

* 
[VK_DEVICE_QUEUE_CREATE_PROTECTED_BIT](#VkDeviceQueueCreateFlagBits) specifies that the device
queue is a protected-capable queue.

* 
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](#VkDeviceQueueCreateFlagBits) specifies
that the device queue is internally synchronized and does not require
external synchronization.

// Provided by VK_VERSION_1_0
typedef VkFlags VkDeviceQueueCreateFlags;

`VkDeviceQueueCreateFlags` is a bitmask type for setting a mask of zero
or more [VkDeviceQueueCreateFlagBits](#VkDeviceQueueCreateFlagBits).

Queues **can** be created with a system-wide priority by adding a
`VkDeviceQueueGlobalPriorityCreateInfo` structure to the `pNext`
chain of [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo).

The `VkDeviceQueueGlobalPriorityCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkDeviceQueueGlobalPriorityCreateInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkQueueGlobalPriority    globalPriority;
} VkDeviceQueueGlobalPriorityCreateInfo;

// Provided by VK_KHR_global_priority
// Equivalent to VkDeviceQueueGlobalPriorityCreateInfo
typedef VkDeviceQueueGlobalPriorityCreateInfo VkDeviceQueueGlobalPriorityCreateInfoKHR;

// Provided by VK_EXT_global_priority
// Equivalent to VkDeviceQueueGlobalPriorityCreateInfo
typedef VkDeviceQueueGlobalPriorityCreateInfo VkDeviceQueueGlobalPriorityCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`globalPriority` is the system-wide priority associated to these
queues as specified by [VkQueueGlobalPriority](#VkQueueGlobalPriority)

Queues created without specifying
`VkDeviceQueueGlobalPriorityCreateInfo` will default to
[VK_QUEUE_GLOBAL_PRIORITY_MEDIUM](#VkQueueGlobalPriorityEXT).

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceQueueGlobalPriorityCreateInfo-sType-sType) VUID-VkDeviceQueueGlobalPriorityCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceQueueGlobalPriorityCreateInfo-globalPriority-parameter) VUID-VkDeviceQueueGlobalPriorityCreateInfo-globalPriority-parameter

 `globalPriority` **must** be a valid [VkQueueGlobalPriority](#VkQueueGlobalPriority) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)

Possible values of
[VkDeviceQueueGlobalPriorityCreateInfo](#VkDeviceQueueGlobalPriorityCreateInfo)::`globalPriority`,
specifying a system-wide priority level are:

// Provided by VK_VERSION_1_4
typedef enum VkQueueGlobalPriority {
    VK_QUEUE_GLOBAL_PRIORITY_LOW = 128,
    VK_QUEUE_GLOBAL_PRIORITY_MEDIUM = 256,
    VK_QUEUE_GLOBAL_PRIORITY_HIGH = 512,
    VK_QUEUE_GLOBAL_PRIORITY_REALTIME = 1024,
  // Provided by VK_EXT_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_LOW_EXT = VK_QUEUE_GLOBAL_PRIORITY_LOW,
  // Provided by VK_EXT_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_EXT = VK_QUEUE_GLOBAL_PRIORITY_MEDIUM,
  // Provided by VK_EXT_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_HIGH_EXT = VK_QUEUE_GLOBAL_PRIORITY_HIGH,
  // Provided by VK_EXT_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_REALTIME_EXT = VK_QUEUE_GLOBAL_PRIORITY_REALTIME,
  // Provided by VK_KHR_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_LOW_KHR = VK_QUEUE_GLOBAL_PRIORITY_LOW,
  // Provided by VK_KHR_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_KHR = VK_QUEUE_GLOBAL_PRIORITY_MEDIUM,
  // Provided by VK_KHR_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_HIGH_KHR = VK_QUEUE_GLOBAL_PRIORITY_HIGH,
  // Provided by VK_KHR_global_priority
    VK_QUEUE_GLOBAL_PRIORITY_REALTIME_KHR = VK_QUEUE_GLOBAL_PRIORITY_REALTIME,
} VkQueueGlobalPriority;

// Provided by VK_KHR_global_priority
// Equivalent to VkQueueGlobalPriority
typedef VkQueueGlobalPriority VkQueueGlobalPriorityKHR;

// Provided by VK_EXT_global_priority
// Equivalent to VkQueueGlobalPriority
typedef VkQueueGlobalPriority VkQueueGlobalPriorityEXT;

Priority values are sorted in ascending order.
A comparison operation on the enum values can be used to determine the
priority order.

* 
[VK_QUEUE_GLOBAL_PRIORITY_LOW](#VkQueueGlobalPriorityEXT) is below the system default.
Useful for non-interactive tasks.

* 
[VK_QUEUE_GLOBAL_PRIORITY_MEDIUM](#VkQueueGlobalPriorityEXT) is the system default priority.

* 
[VK_QUEUE_GLOBAL_PRIORITY_HIGH](#VkQueueGlobalPriorityEXT) is above the system default.

* 
[VK_QUEUE_GLOBAL_PRIORITY_REALTIME](#VkQueueGlobalPriorityEXT) is the highest priority.
Useful for critical tasks.

Queues with higher system priority **may** be allotted more processing time
than queues with lower priority.
An implementation **may** allow a higher-priority queue to starve a
lower-priority queue until the higher-priority queue has no further commands
to execute.

Priorities imply no ordering or scheduling constraints.

No specific guarantees are made about higher priority queues receiving more
processing time or better quality of service than lower priority queues.

The global priority level of a queue takes precedence over the per-process
queue priority ([VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)::`pQueuePriorities`).

Abuse of this feature **may** result in starving the rest of the system of
implementation resources.
Therefore, the driver implementation **may** deny requests to acquire a
priority above the default priority ([VK_QUEUE_GLOBAL_PRIORITY_MEDIUM](#VkQueueGlobalPriorityEXT))
if the caller does not have sufficient privileges.
In this scenario [VK_ERROR_NOT_PERMITTED](fundamentals.html#VkResult) is returned.

The driver implementation **may** fail the queue allocation request if
resources required to complete the operation have been exhausted (either by
the same process or a different process).
In this scenario [VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult) is returned.

If the [`globalPriorityQuery`](features.html#features-globalPriorityQuery) feature
is enabled and the requested global priority is not reported via
[VkQueueFamilyGlobalPriorityProperties](#VkQueueFamilyGlobalPriorityProperties), the driver implementation **must**
fail the queue creation.
In this scenario, [VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult) is returned.

The number of shader cores used by a queue **can** be controlled by adding a
`VkDeviceQueueShaderCoreControlCreateInfoARM` structure to the
`pNext` chain of [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structures.

The `VkDeviceQueueShaderCoreControlCreateInfoARM` structure is defined
as:

// Provided by VK_ARM_scheduling_controls
typedef struct VkDeviceQueueShaderCoreControlCreateInfoARM {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           shaderCoreCount;
} VkDeviceQueueShaderCoreControlCreateInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`shaderCoreCount` is the number of shader cores this queue uses.

Queues created without specifying
`VkDeviceQueueShaderCoreControlCreateInfoARM` will default to using all
the shader cores available.

Valid Usage

* 
[](#VUID-VkDeviceQueueShaderCoreControlCreateInfoARM-shaderCoreCount-09399) VUID-VkDeviceQueueShaderCoreControlCreateInfoARM-shaderCoreCount-09399

`shaderCoreCount` **must** be greater than 0 and less than or equal to
the total number of shader cores as reported via
[VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM](limits.html#VkPhysicalDeviceShaderCoreBuiltinsPropertiesARM)::`shaderCoreCount`

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceQueueShaderCoreControlCreateInfoARM-sType-sType) VUID-VkDeviceQueueShaderCoreControlCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_QUEUE_SHADER_CORE_CONTROL_CREATE_INFO_ARM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](#VkDeviceCreateInfo)

* 
[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)

To retrieve a handle to a [VkQueue](#VkQueue) object, call:

// Provided by VK_VERSION_1_0
void vkGetDeviceQueue(
    VkDevice                                    device,
    uint32_t                                    queueFamilyIndex,
    uint32_t                                    queueIndex,
    VkQueue*                                    pQueue);

* 
`device` is the logical device that owns the queue.

* 
`queueFamilyIndex` is the index of the queue family to which the
queue belongs.

* 
`queueIndex` is the index within this queue family of the queue to
retrieve.

* 
`pQueue` is a pointer to a [VkQueue](#VkQueue) object that will be filled
with the handle for the requested queue.

`vkGetDeviceQueue` **must** only be used to get queues that were created
with the `flags` parameter of [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) set to zero.
To get queues that were created with a non-zero `flags` parameter use
[vkGetDeviceQueue2](#vkGetDeviceQueue2).

Valid Usage

* 
[](#VUID-vkGetDeviceQueue-queueFamilyIndex-00384) VUID-vkGetDeviceQueue-queueFamilyIndex-00384

`queueFamilyIndex` **must** be one of the queue family indices
specified when `device` was created, via the
[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structure

* 
[](#VUID-vkGetDeviceQueue-queueIndex-00385) VUID-vkGetDeviceQueue-queueIndex-00385

`queueIndex` **must** be less than the value of
[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)::`queueCount` for the queue family
indicated by `queueFamilyIndex` when `device` was created

* 
[](#VUID-vkGetDeviceQueue-flags-01841) VUID-vkGetDeviceQueue-flags-01841

[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)::`flags` **must** have been zero when
`device` was created

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceQueue-device-parameter) VUID-vkGetDeviceQueue-device-parameter

 `device` **must** be a valid [VkDevice](#VkDevice) handle

* 
[](#VUID-vkGetDeviceQueue-pQueue-parameter) VUID-vkGetDeviceQueue-pQueue-parameter

 `pQueue` **must** be a valid pointer to a [VkQueue](#VkQueue) handle

To retrieve a handle to a [VkQueue](#VkQueue) object with specific
[VkDeviceQueueCreateFlags](#VkDeviceQueueCreateFlags) creation flags, call:

// Provided by VK_VERSION_1_1
void vkGetDeviceQueue2(
    VkDevice                                    device,
    const VkDeviceQueueInfo2*                   pQueueInfo,
    VkQueue*                                    pQueue);

* 
`device` is the logical device that owns the queue.

* 
`pQueueInfo` is a pointer to a [VkDeviceQueueInfo2](#VkDeviceQueueInfo2) structure,
describing parameters of the device queue to be retrieved.

* 
`pQueue` is a pointer to a [VkQueue](#VkQueue) object that will be filled
with the handle for the requested queue.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceQueue2-device-parameter) VUID-vkGetDeviceQueue2-device-parameter

 `device` **must** be a valid [VkDevice](#VkDevice) handle

* 
[](#VUID-vkGetDeviceQueue2-pQueueInfo-parameter) VUID-vkGetDeviceQueue2-pQueueInfo-parameter

 `pQueueInfo` **must** be a valid pointer to a valid [VkDeviceQueueInfo2](#VkDeviceQueueInfo2) structure

* 
[](#VUID-vkGetDeviceQueue2-pQueue-parameter) VUID-vkGetDeviceQueue2-pQueue-parameter

 `pQueue` **must** be a valid pointer to a [VkQueue](#VkQueue) handle

The `VkDeviceQueueInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkDeviceQueueInfo2 {
    VkStructureType             sType;
    const void*                 pNext;
    VkDeviceQueueCreateFlags    flags;
    uint32_t                    queueFamilyIndex;
    uint32_t                    queueIndex;
} VkDeviceQueueInfo2;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.
The `pNext` chain of `VkDeviceQueueInfo2` **can** be used to
provide additional device queue parameters to `vkGetDeviceQueue2`.

* 
`flags` is a [VkDeviceQueueCreateFlags](#VkDeviceQueueCreateFlags) value indicating the
flags used to create the device queue.

* 
`queueFamilyIndex` is the index of the queue family to which the
queue belongs.

* 
`queueIndex` is the index of the queue to retrieve from within the
set of queues that share both the queue family and flags specified.

The queue returned by `vkGetDeviceQueue2` **must** have the same
`flags` value from this structure as that used at device creation time
in a [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structure.

|  | Normally, if you create both protected-capable and non-protected-capable
| --- | --- |
queues with the same family, they are treated as separate lists of queues
and `queueIndex` is relative to the start of the list of queues
specified by both `queueFamilyIndex` and `flags`.
However, for historical reasons, some implementations may exhibit different
behavior.
These divergent implementations instead concatenate the lists of queues and
treat `queueIndex` as relative to the start of the first list of queues
with the given `queueFamilyIndex`.
This only matters in cases where an application has created both
protected-capable and non-protected-capable queues from the same queue
family.

For such divergent implementations, the maximum value of `queueIndex` is
equal to the sum of [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)::`queueCount` minus
one, for all [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structures that share a common
`queueFamilyIndex`.

Such implementations will return `NULL` for either the protected or
unprotected queues when calling `vkGetDeviceQueue2` with `queueIndex` in
the range zero to [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)::`queueCount` minus one.
In cases where these implementations returned `NULL`, the corresponding
queues are instead located in the extended range described in the preceding
two paragraphs.

This behavior will not be observed on any driver that has passed Vulkan
conformance test suite version 1.3.3.0, or any subsequent version.
This information can be found by querying
`VkPhysicalDeviceDriverProperties`::`conformanceVersion`. |

Valid Usage

* 
[](#VUID-VkDeviceQueueInfo2-queueFamilyIndex-01842) VUID-VkDeviceQueueInfo2-queueFamilyIndex-01842

`queueFamilyIndex` **must** be one of the queue family indices
specified when `device` was created, via the
[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structure

* 
[](#VUID-VkDeviceQueueInfo2-flags-06225) VUID-VkDeviceQueueInfo2-flags-06225

`flags` **must** be equal to [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)::`flags`
for a [VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structure for the queue family
indicated by `queueFamilyIndex` when `device` was created

* 
[](#VUID-VkDeviceQueueInfo2-queueIndex-01843) VUID-VkDeviceQueueInfo2-queueIndex-01843

`queueIndex` **must** be less than
[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo)::`queueCount` for the corresponding
queue family and flags indicated by `queueFamilyIndex` and
`flags` when `device` was created

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceQueueInfo2-sType-sType) VUID-VkDeviceQueueInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_QUEUE_INFO_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceQueueInfo2-pNext-pNext) VUID-VkDeviceQueueInfo2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceQueueInfo2-flags-parameter) VUID-VkDeviceQueueInfo2-flags-parameter

 `flags` **must** be a valid combination of [VkDeviceQueueCreateFlagBits](#VkDeviceQueueCreateFlagBits) values

The queue family index is used in multiple places in Vulkan in order to tie
operations to a specific family of queues.

When retrieving a handle to the queue via `vkGetDeviceQueue`, the queue
family index is used to select which queue family to retrieve the
`VkQueue` handle from as described in the previous section.

When creating a `VkCommandPool` object (see
[Command Pools](cmdbuffers.html#commandbuffers-pools)), a queue family index is specified
in the [VkCommandPoolCreateInfo](cmdbuffers.html#VkCommandPoolCreateInfo) structure.
Command buffers from this pool **can** only be submitted on queues
corresponding to this queue family.

When creating `VkImage` (see [Images](resources.html#resources-images)) and
`VkBuffer` (see [Buffers](resources.html#resources-buffers)) resources, a set of queue
families is included in the [VkImageCreateInfo](resources.html#VkImageCreateInfo) and
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo) structures to specify the queue families that **can**
access the resource.

When inserting a [VkBufferMemoryBarrier](synchronization.html#VkBufferMemoryBarrier) or [VkImageMemoryBarrier](synchronization.html#VkImageMemoryBarrier)
(see [Pipeline Barriers](synchronization.html#synchronization-pipeline-barriers)), a source and destination queue
family index is specified to allow the ownership of a buffer or image to be
transferred from one queue family to another.
See the [Resource Sharing](resources.html#resources-sharing) section for details.

Each queue is assigned a priority, as set in the
[VkDeviceQueueCreateInfo](#VkDeviceQueueCreateInfo) structures when creating the device.
The priority of each queue is a normalized floating-point value between 0.0
and 1.0, which is then translated to a discrete priority level by the
implementation.
Higher values indicate a higher priority, with 0.0 being the lowest priority
and 1.0 being the highest.

Within the same device, queues with higher priority **may** be allotted more
processing time than queues with lower priority.
The implementation makes no guarantees with regards to ordering or
scheduling among queues with the same priority, other than the constraints
defined by any [explicit synchronization primitives](synchronization.html#synchronization).
The implementation makes no guarantees with regards to queues across
different devices.

An implementation **may** allow a higher-priority queue to starve a
lower-priority queue on the same `VkDevice` until the higher-priority
queue has no further commands to execute.
The relationship of queue priorities **must** not cause queues on one
`VkDevice` to starve queues on another `VkDevice`.

No specific guarantees are made about higher priority queues receiving more
processing time or better quality of service than lower priority queues.

Work is submitted to a queue via *queue submission* commands such as
[vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2) or
[vkQueuePresentKHR](VK_KHR_surface/wsi.html#vkQueuePresentKHR) or
[vkQueueSubmit](cmdbuffers.html#vkQueueSubmit).
Queue submission commands define a set of *queue operations* to be executed
by the underlying physical device, including synchronization with semaphores
and fences.

Submission commands take as parameters a target queue, zero or more
*batches* of work, and an **optional** fence to signal upon completion.
Each batch consists of three distinct parts:

Zero or more semaphores to wait on before execution of the rest of the
batch.

* 
If present, these describe a [     semaphore wait operation](synchronization.html#synchronization-semaphores-waiting).

Zero or more work items to execute.

* 
If present, these describe a *queue operation* matching the work
described.

Zero or more semaphores to signal upon completion of the work items.

* 
If present, these describe a [     semaphore signal operation](synchronization.html#synchronization-semaphores-signaling).

If a fence is present in a queue submission, it describes a
[fence signal operation](synchronization.html#synchronization-fences-signaling).

All work described by a queue submission command **must** be submitted to the
queue before the command returns.

In Vulkan it is possible to sparsely bind memory to buffers and images as
described in the [Sparse Resource](sparsemem.html#sparsememory) chapter.
Sparse memory binding is a queue operation.
A queue whose flags include the [VK_QUEUE_SPARSE_BINDING_BIT](#VkQueueFlagBits) **must** be
able to support the mapping of a virtual address to a physical address on
the device.
This causes an update to the page table mappings on the device.
This update **must** be synchronized on a queue to avoid corrupting page table
mappings during execution of graphics commands.
By binding the sparse memory resources on queues, all commands that are
dependent on the updated bindings are synchronized to only execute after the
binding is updated.
See the [Synchronization and Cache Control](synchronization.html#synchronization) chapter for
how this synchronization is accomplished.

Queues are created along with a logical device during `vkCreateDevice`.
All queues associated with a logical device are destroyed when
`vkDestroyDevice` is called on that device.
