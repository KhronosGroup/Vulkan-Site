# VK_EXT_device_fault

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_device_fault.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Features](#_api_features)
- [3.1._API_Features](#_api_features)
- [3.2. Querying for Fault Information](#_querying_for_fault_information)
- [3.2._Querying_for_Fault_Information](#_querying_for_fault_information)
- [3.3. Interpreting GPU Virtual Addresses](#_interpreting_gpu_virtual_addresses)
- [3.3._Interpreting_GPU_Virtual_Addresses](#_interpreting_gpu_virtual_addresses)
- [3.4. Vendor Binary Crash Dumps](#_vendor_binary_crash_dumps)
- [3.4._Vendor_Binary_Crash_Dumps](#_vendor_binary_crash_dumps)
- [4. Issues](#_issues)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Features](#_api_features)
[3.2. Querying for Fault Information](#_querying_for_fault_information)
[3.3. Interpreting GPU Virtual Addresses](#_interpreting_gpu_virtual_addresses)
[3.4. Vendor Binary Crash Dumps](#_vendor_binary_crash_dumps)

[4. Issues](#_issues)

This document outlines functionality to allow applications to query for
additional diagnostic information following device-loss.

Device-loss errors can be challenging to diagnose. They can be triggered by a
number of issues, including invalid application behavior, driver bugs, and
physical failure or removal of hardware. Whilst the Vulkan Validation layers are
recommended as a first step in diagnosing the majority of API usage issues, they
are unable to address all possible causes of device-loss.

This proposal aims to provide application developers with additional information
that may aid in diagnosing such errors.

Several options have been considered:

* 
Provide foundational extensions to enable the development of crash postmortem
tooling

* 
Develop extensions or tools that aim to attribute faults to individual Vulkan
objects

* 
Rely on individual vendor tools and extensions

This proposal focuses on the first option. It represents a partial solution,
with further extensions required in order to fully enable crash postmortem
tooling.

The following features are exposed by the `VK_EXT_device_fault` extension:

typedef struct VkPhysicalDeviceFaultFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           deviceFault;
    VkBool32           deviceFaultVendorBinary;
} VkPhysicalDeviceFaultFeaturesEXT;

`deviceFault` is the main feature enabling this extension’s functionality and
must be supported if this extension is supported.

`deviceFaultVendorBinary` is an optional feature that enables support for
vendor-specific binary crash dumps, which may be interpreted via external vendor
tools.

Following device-loss, applications may query for additional diagnostic
information by calling `vkGetDeviceFaultInfoEXT`.

typedef struct VkDeviceFaultCountsEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           addressInfoCount;
    uint32_t           vendorInfoCount;
    VkDeviceSize       vendorBinarySize;
} VkDeviceFaultCountsEXT;

typedef struct VkDeviceFaultInfoEXT {
    VkStructureType                 sType;
    void*                           pNext;
    char                            description[VK_MAX_DESCRIPTION_SIZE];
    VkDeviceFaultAddressInfoEXT*    pAddressInfos;
    VkDeviceFaultVendorInfoEXT*     pVendorInfos;
    void*                           pVendorBinaryData;
} VkDeviceFaultInfoEXT;

VKAPI_ATTR VkResult VKAPI_CALL vkGetDeviceFaultInfoEXT(
    VkDevice                                    device,
    VkDeviceFaultCountsEXT*                     pFaultCounts,
    VkDeviceFaultInfoEXT*                       pFaultInfo);

The signature of `vkGetDeviceFaultInfoEXT` is intended to mirror the design of
existing query functions, where the second parameter (`pFaultCounts`) indicates
size of output arrays, or the number of results written. However, device fault
information requires multiple output arrays. Therefore, a
`VkDeviceFaultCountsEXT` structure is used to specify the sizes of multiple
arrays at once.

// Query number of available results
VkDeviceFaultCountsEXT faultCounts{};
faultCounts.sType = VK_STRUCTURE_TYPE_DEVICE_FAULT_COUNTS_EXT;

vkGetDeviceFaultInfoEXT(device, &faultCounts, NULL);

// Allocate output arrays and query fault data
VkDeviceFaultInfoEXT faultInfo{}
info.sType             = VK_STRUCTURE_TYPE_DEVICE_FAULT_INFO_EXT;
info.pAddressInfos = (VkDeviceFaultAddressInfoEXT*) malloc(sizeof(VkDeviceFaultAddressInfoEXT) *
                                                           faultCounts.addressInfoCount);
info.pVendorInfos  = (VkDeviceFaultVendorInfoEXT*)  malloc(sizeof(VkDeviceFaultVendorInfoEXT)  *
                                                           faultCounts.vendorInfoCount);
info.pVendorBinaryData = malloc(faultCounts.vendorBinarySize);

vkGetDeviceFaultInfoEXT(device, &faultCounts, &faultInfo);

Implementations may return information on both page faults generated by invalid
memory accesses, and instruction pointers indicating the instructions executing
at the time of the fault.

typedef enum VkDeviceFaultAddressTypeEXT {
    VK_DEVICE_FAULT_ADDRESS_TYPE_NONE_EXT = 0,
    VK_DEVICE_FAULT_ADDRESS_TYPE_READ_INVALID_EXT = 1,
    VK_DEVICE_FAULT_ADDRESS_TYPE_WRITE_INVALID_EXT = 2,
    VK_DEVICE_FAULT_ADDRESS_TYPE_EXECUTE_INVALID_EXT = 3,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_UNKNOWN_EXT = 4,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_INVALID_EXT = 5,
    VK_DEVICE_FAULT_ADDRESS_TYPE_INSTRUCTION_POINTER_FAULT_EXT = 6,
    VK_DEVICE_FAULT_ADDRESS_TYPE_MAX_ENUM_EXT = 0x7FFFFFFF
} VkDeviceFaultAddressTypeEXT;

typedef struct VkDeviceFaultAddressInfoEXT {
    VkDeviceFaultAddressTypeEXT    addressType;
    VkDeviceAddress                reportedAddress;
    VkDeviceSize                   addressPrecision;
} VkDeviceFaultAddressInfoEXT;

Page addresses and instruction pointers are reported as GPU virtual addresses,
and additional extensions or vendor tools may be required in order to correlate
these extensions with individual Vulkan objects.

Implementations may only be able to report these addresses with limited
precision. The combination of `reportedAddress` and `addressPrecision`
allow the possible range of addresses to be calculated, such that:

lower_address = (pInfo->reportedAddress & ~(pInfo->addressPrecision-1))
upper_address = (pInfo->reportedAddress |  (pInfo->addressPrecision-1))

|  | It is valid for the `reportedAddress` to contain a more precise address
| --- | --- |
than indicated by `addressPrecision`.
In this case, the value of `reportedAddress` should be
treated as an additional hint as to the value of the address that triggered the
page fault, or to the value of an instruction pointer. |

Optionally, implementations may also support the generation of vendor-specific
binary blobs containing additional diagnostic information. All vendor-specific
binaries will begin with a common header. The contents of the remainder of the
binary blob are vendor-specific, and will require vendor-specific documentation
or tools to interpret.

typedef struct VkDeviceFaultVendorBinaryHeaderVersionOneEXT {
    uint32_t                                     headerSize;
    VkDeviceFaultVendorBinaryHeaderVersionEXT    headerVersion;
    uint32_t                                     vendorID;
    uint32_t                                     deviceID;
    uint32_t                                     driverVersion;
    uint8_t                                      pipelineCacheUUID[VK_UUID_SIZE];
    uint32_t                                     applicationNameOffset;
    uint32_t                                     applicationVersion;
    uint32_t                                     engineNameOffset;
} VkDeviceFaultVendorBinaryHeaderVersionOneEXT;

1) Should `vkGetDeviceFaultInfoEXT` return multiple faults?

**RESOLVED**: No. This extension only seeks to identify a single fault as a
possible cause of device loss and not to maintain a log of multiple faults.
We anticipate that in cases where a GPU does encounter multiple faults, there
is a high probability that the faults would be duplicates, such as those caused
by parallel execution of the same defective code.

2) Can `vkGetDeviceFaultInfoEXT` be called prior to device loss?

**RESOLVED**: No. `VK_KHR_fault_handling` in VulkanSC does support an equivalent
to this, but `VK_KHR_fault_handling` aims to address a different use case, where
a fault log is polled prior to device loss to enable remedial action to be taken.

3) Do page faults need to report the actual address that was accessed, or
should we allow reporting of the page address?

**RESOLVED**: Some IHVs hardware reports page faults at page alignment, or
at some other hardware-unit dependent granularity, rather than the precise
address that triggered the fault. All addresses are reported at hardware-unit
dependent granularity, along with an associated precision indicator. This information
can be used to compute an address range that contains the original address that
triggered the fault.

4) How should we report cases where one of multiple pipelines may have caused a
fault?

**RESOLVED**: In cases where a fault cannot be attributed to a single unique
pipeline, reporting the set of possible candidates is desirable.

5) The page fault and instruction address information structures have similar
structure. Should they be combined?

**RESOLVED**: Yes. These have been combined as `VkDeviceFaultAddressInfoEXT`
to reduce API surface area.

6) How should implementors approach extensibility for vendor-specific faults?
Should they rely on `pNext` chains, or should the extension introduce a
generic structure to return vendor error codes and human-readable descriptions
in the base structure?

**RESOLVED**: Implementors should utilize the generic
`VkDeviceFaultVendorInfoEXT` structures where applicable, and fallback to
extending `pNext` chains where this is insufficient. Where a `pNext`
chain is required, vendors should tailor their human-readable error
descriptions to advise developers that additional information may be available.
