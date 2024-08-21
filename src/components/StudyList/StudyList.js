import './studyList.css';
import axios from 'axios';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import searchBtn from '../../assets/images/Vector.png';
import dropdownBtn from '../../assets/images/ic_toggle.png';
import StudyCard from '../StudyCard/StudyCard';

const StudyList = () => {
  const [studyCards, setStudyCards] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [isOpen, setIsOpen] = useState(false);
  const [boxText, setBoxText] = useState('최근 순');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [order, setOrder] = useState('recent');
  const observer = useRef();
  const dropDownRef = useRef(null);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const fetchStudyCards = async (page, searchKeyword, order) => {
    setIsLoading(true); // 로딩 시작
    const response = await axios.get(
      `https://onest-term-study-forest-be-3team-rovo.onrender.com/study?page=${page}&pageSize=${pageSize}&order=${order}&keyWord=${searchKeyword}`
    );
    if (response.data.length < pageSize) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    const newCards = response.data;
    const uniqueCards = Array.from(new Set([...studyCards, ...newCards].map((card) => card.id))).map((id) => {
      return [...studyCards, ...newCards].find((card) => card.id === id);
    });
    setStudyCards(uniqueCards);
    setIsLoading(false); // 로딩 종료
  };

  useEffect(() => {
    setStudyCards([]); // 기존 카드 초기화
    setPage(1); // 페이지 초기화
    fetchStudyCards(1, searchKeyword, order); // 초기 페이지 데이터 로드
  }, [searchKeyword, order]);

  useEffect(() => {
    if (page > 1) {
      fetchStudyCards(page, searchKeyword, order); // 페이지 변경 시 데이터 로드
    }
  }, [page]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickRecent = () => {
    setBoxText('최신순');
    setOrder('recent');
    setPage(1); // 페이지 초기화
    setStudyCards([]); // 기존 카드 초기화
    fetchStudyCards(1, searchKeyword, 'recent'); // 정렬 변경 시 데이터 로드
  };

  const handleClickOldest = () => {
    setBoxText('오래된 순');
    setOrder('oldest');
    setPage(1); // 페이지 초기화
    setStudyCards([]); // 기존 카드 초기화
    fetchStudyCards(1, searchKeyword, 'oldest'); // 정렬 변경 시 데이터 로드
  };

  const handleClickMostPoint = () => {
    setBoxText('많은 포인트 순');
    setOrder('mostPoint');
    setPage(1); // 페이지 초기화
    setStudyCards([]); // 기존 카드 초기화
    fetchStudyCards(1, searchKeyword, 'mostPoint'); // 정렬 변경 시 데이터 로드
  };

  const handleClicLeastPoint = () => {
    setBoxText('적은 포인트 순');
    setOrder('leastPoint');
    setPage(1); // 페이지 초기화
    setStudyCards([]); // 기존 카드 초기화
    fetchStudyCards(1, searchKeyword, 'leastPoint'); // 정렬 변경 시 데이터 로드
  };

  const handleViewMore = () => {
    if (!isLoading) {
      // 로딩 중이 아닐 때만 페이지 증가
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchClick = () => {
    setStudyCards([]); // 기존 카드 초기화
    setPage(1); // 페이지 초기화
    fetchStudyCards(1, searchKeyword, order); // 검색 실행
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick(); // 엔터 키를 누르면 검색 실행
    }
  };

  return (
    <div className="study-list__container">
      <p>스터디 둘러보기</p>
      <div className="study-list__nav">
        <div className="study-list__nav__search-container">
          <input
            placeholder="검색"
            className="study-list__nav__search"
            value={searchKeyword}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          <img src={searchBtn} alt="search" className="study-list__nav__search-icon" onClick={handleSearchClick} />
        </div>
        <div className="study-list__nav__dropdown" onClick={toggleDropDown} ref={dropDownRef}>
          <p>{boxText}</p>
          <img src={dropdownBtn} alt="dropdownBtn" className={`dropdownBtn ${isOpen ? 'rotate' : ''}`} />
          {isOpen && (
            <div className="study-list__nav__dropdown-box">
              <div className="order recent" onClick={handleClickRecent}>
                최근 순
              </div>
              <div className="order oldest" onClick={handleClickOldest}>
                오래된 순
              </div>
              <div className="order most-point" onClick={handleClickMostPoint}>
                많은 포인트 순
              </div>
              <div className="order least-point" onClick={handleClicLeastPoint}>
                적은 포인트 순
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="study-list__grid">
        {studyCards.map((card, index) => (
          <StudyCard
            key={index}
            id={card.id}
            name={card.studyName}
            description={card.description}
            nickname={card.nickname}
            point={card.point}
            background={card.background}
          />
        ))}
      </div>
      {hasMore && (
        <div className={`study-list__view-more ${isLoading ? 'disabled' : ''}`} onClick={handleViewMore}>
          더보기
        </div>
      )}
    </div>
  );
};

export default StudyList;
