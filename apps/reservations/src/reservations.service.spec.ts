import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { ReservationsRepository } from './reservations.repository';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { BadRequestException } from '@nestjs/common';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let repository: ReservationsRepository;

  // Create variables for each mock function
  const createMock = jest.fn();
  const findMock = jest.fn();
  const findOneMock = jest.fn();
  const findOneAndUpdateMock = jest.fn();
  const findOneAndDeleteMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: ReservationsRepository,
          useValue: {
            create: createMock,
            find: findMock,
            findOne: findOneMock,
            findOneAndUpdate: findOneAndUpdateMock,
            findOneAndDelete: findOneAndDeleteMock,
          },
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    repository = module.get<ReservationsRepository>(ReservationsRepository);
  });

  // Clear mock data between tests
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a reservation', async () => {
      const createReservationDto: CreateReservationDto = {
        startDate: new Date('2023-05-01T00:00:00.000Z'),
        endDate: new Date('2023-05-10T00:00:00.000Z'),
        placeId: 'some-place-id',
        invoiceId: 'some-invoice-id',
      };
      const expectedResult = {
        _id: 'reservation-1',
        startDate: new Date('2023-05-01T00:00:00.000Z'),
        endDate: new Date('2023-05-10T00:00:00.000Z'),
        placeId: 'some-place-id',
        invoiceId: 'some-invoice-id',
        userId: '123',
        timestamp: new Date('2023-04-29T12:00:00.000Z'),
      };

      createMock.mockResolvedValueOnce(expectedResult);
      const result = await service.create(createReservationDto);

      const expectedCreateReservation = {
        ...createReservationDto,
        userId: '123',
        timestamp: expect.any(Date),
      };

      expect(createMock).toHaveBeenCalledWith(expectedCreateReservation);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return all reservations', async () => {
      const expectedResult = [
        {
          _id: 'reservation-2',
          startDate: new Date('2023-05-01T00:00:00.000Z'),
          endDate: new Date('2023-05-10T00:00:00.000Z'),
          placeId: 'some-place-id',
          invoiceId: 'some-invoice-id',
          userId: '123',
          timestamp: new Date('2023-04-29T12:00:00.000Z'),
        },
        {
          _id: 'reservation-3',
          startDate: new Date('2023-05-01T00:00:00.000Z'),
          endDate: new Date('2023-05-10T00:00:00.000Z'),
          placeId: 'some-place-id',
          invoiceId: 'some-invoice-id',
          userId: '123',
          timestamp: new Date('2023-04-29T12:00:00.000Z'),
        },
        // ...
      ];

      findMock.mockResolvedValueOnce(expectedResult);
      const result = await service.findAll();

      expect(findMock).toHaveBeenCalledWith({});
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a reservation by ID', async () => {
      const id = 'reservation-1';
      const expectedResult = {
        _id: 'reservation-4',
        startDate: new Date('2023-05-01T00:00:00.000Z'),
        endDate: new Date('2023-05-10T00:00:00.000Z'),
        placeId: 'some-place-id',
        invoiceId: 'some-invoice-id',
        userId: '123',
        timestamp: new Date('2023-04-29T12:00:00.000Z'),
      };

      findOneMock.mockResolvedValueOnce(expectedResult);
      const result = await service.findOne(id);

      expect(findOneMock).toHaveBeenCalledWith({ _id: id });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update a reservation by ID', async () => {
      const id = 'reservation-1';
      const updateReservationDto: UpdateReservationDto = {
        startDate: new Date('2023-05-01T00:00:00.000Z'),
        endDate: new Date('2023-05-10T00:00:00.000Z'),
        placeId: 'some-place-id',
        invoiceId: 'some-invoice-id',
      };
      const expectedResult = {
        _id: 'reservation-5',
        startDate: new Date('2023-05-01T00:00:00.000Z'),
        endDate: new Date('2023-05-10T00:00:00.000Z'),
        placeId: 'some-place-id',
        invoiceId: 'some-invoice-id',
        userId: '123',
        timestamp: new Date('2023-04-29T12:00:00.000Z'),
      };

      findOneAndUpdateMock.mockResolvedValueOnce(expectedResult);
      const result = await service.update(id, updateReservationDto);

      expect(findOneAndUpdateMock).toHaveBeenCalledWith(
        { _id: id },
        { $set: updateReservationDto },
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should remove a reservation by ID', async () => {
      const id = 'reservation-5';
      const expectedResult = {
        _id: 'reservation-5',
        startDate: new Date('2023-05-01T00:00:00.000Z'),
        endDate: new Date('2023-05-10T00:00:00.000Z'),
        placeId: 'some-place-id',
        invoiceId: 'some-invoice-id',
        userId: '123',
        timestamp: new Date('2023-04-29T12:00:00.000Z'),
      };

      findOneAndDeleteMock.mockResolvedValueOnce(expectedResult);
      const result = await service.remove(id);

      expect(findOneAndDeleteMock).toHaveBeenCalledWith({ _id: id });
      expect(result).toEqual(expectedResult);
    });

    it('should throw a BadRequestException on error', async () => {
      const id = 'reservation-1';
      const error = new Error();
      findOneAndDeleteMock.mockImplementationOnce(() => {
        throw error;
      });

      try {
        await service.remove(id);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.cause).toBeInstanceOf(Error);
      }
    });
  });
});
